"""Run with: browser-use < tests/report-browser-check.py
Requires the production site at REPORT_BASE_URL (default http://localhost:3101).
Uses browser-use only. Does not change the existing Playwright test suite.
"""
import base64
import json
import os
from pathlib import Path
import time

base = os.environ.get('REPORT_BASE_URL', 'http://localhost:3101')
output = Path('/tmp/provisions-report-audit')
output.mkdir(exist_ok=True)
matching = [tab for tab in list_tabs() if tab['targetId'] == os.environ.get('REPORT_TAB_ID', '')] or [tab for tab in list_tabs() if tab['url'].startswith(base)]
if matching:
    switch_tab(matching[0]['targetId'])
else:
    new_tab(base + '/report')
cdp('Emulation.setFocusEmulationEnabled', enabled=True)
try:
    cdp('Page.addScriptToEvaluateOnNewDocument', source="""
    (() => {
window.__reportErrors = [];
    addEventListener('error', e => __reportErrors.push(e.message));
    addEventListener('unhandledrejection', e => __reportErrors.push(String(e.reason)));
    const originalError = console.error;
    console.error = (...args) => { __reportErrors.push(args.map(String).join(' ')); originalError(...args); };
})();
    """)
    expected_ids = ['title-block', 'summary', 'group-declaration', 'acknowledgement', 'project-details', 'background', 'problem', 'criteria', 'options', 'selection', 'design', 'prototyping', 'implementation', 'cost', 'other', 'recommendations', 'references', 'appendices']
    nav = [('Summary', 'summary'), ('Background', 'background'), ('Options', 'options'), ('Design', 'design'), ('Prototype', 'prototyping'), ('Delivery', 'implementation'), ('Cost', 'cost'), ('References', 'references'), ('Appendices', 'appendices')]

    def click_named(role, name):
        nodes = cdp('Accessibility.getFullAXTree')['nodes']
        candidates = [node for node in nodes if node.get('role', {}).get('value') == role and node.get('name', {}).get('value') == name and not node.get('ignored')]
        viewport = js('({width:innerWidth,height:innerHeight})')
        for node in candidates:
            box = cdp('DOM.getBoxModel', backendNodeId=node['backendDOMNodeId'])['model']['content']
            x, y = sum(box[0::2]) / 4, sum(box[1::2]) / 4
            if 0 <= x <= viewport['width'] and 0 <= y <= viewport['height']:
                click_at_xy(x, y)
                break
        else:
            raise AssertionError(('No visible control', role, name))
        time.sleep(.2)


    def open_menu():
        if js("document.querySelector('button[aria-controls=report-navigation]').getAttribute('aria-expanded')") == 'true':
            return
        node = next(n for n in cdp('Accessibility.getFullAXTree')['nodes'] if n.get('role', {}).get('value') == 'button' and n.get('name', {}).get('value') == 'Menu')
        q = cdp('DOM.getBoxModel', backendNodeId=node['backendDOMNodeId'])['model']['content']
        x,y = sum(q[0::2])/4,sum(q[1::2])/4
        cdp('Input.dispatchMouseEvent', type='mouseMoved', x=0, y=850)
        cdp('Input.dispatchMouseEvent', type='mouseMoved', x=x, y=y)
        time.sleep(.3)


    def navigate(label, section):
        open_menu()
        click_named('link', label)
        state = js("({hash:location.hash,top:document.getElementById(" + json.dumps(section) + ").getBoundingClientRect().top,active:document.querySelector('header > div > span')?.textContent})")
        assert state['hash'] == '#' + section, state
        assert abs(state['top'] - 150) < 2, state
        assert state['active'] == label, state


    def shot(name):
        output.joinpath(name + '.png').write_bytes(base64.b64decode(cdp('Page.captureScreenshot', format='png')['data']))

    results = []
    for width in [375, 768, 1440]:
        cdp('Emulation.setDeviceMetricsOverride', width=width, height=900, deviceScaleFactor=1, mobile=False)
        cdp('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'reduce'}])
        goto_url(base + '/report?report-check=' + str(width))
        wait_for_load()
        time.sleep(.4)
        state = js("""({
          width:innerWidth, scrollWidth:document.documentElement.scrollWidth,
          ids:[...document.querySelectorAll('main section[id]')].map(e=>e.id),
          tables:[...document.querySelectorAll('table')].map(t=>t.tBodies[0].rows.length),
          references:[...document.querySelectorAll('#references li')].map(e=>e.textContent),
          brokenAnchors:[...document.links].filter(a=>!a.getAttribute('href').startsWith('#')||!document.getElementById(a.hash.slice(1))).map(a=>a.outerHTML),
          placeholders:[...document.querySelectorAll('div[id]')].filter(e=>e.textContent.startsWith('insert: ')).map(e=>{
            const s=getComputedStyle(e);return {text:e.textContent,height:e.clientHeight,width:s.width,parentWidth:e.parentElement.clientWidth,background:s.backgroundColor,border:s.borderWidth,radius:s.borderRadius,shadow:s.boxShadow,display:s.display,align:s.alignItems,justify:s.justifyContent,color:s.color};
          }),
          notesHighlighted:[...document.querySelectorAll('main p,main li')].filter(e=>e.textContent.includes('TEAM TO ADD:')).every(e=>[...e.querySelectorAll('mark')].some(m=>m.textContent.includes('TEAM TO ADD:'))),
          stats:[...document.querySelectorAll('#summary article h3')].map(e=>e.textContent),
          stageRails:document.querySelectorAll('[aria-label="project stages"]').length,
          footers:document.querySelectorAll('footer').length
        })""")
        assert state['width'] == state['scrollWidth'] == width, (width, state['scrollWidth'])
        assert state['ids'] == expected_ids, state['ids']
        assert state['tables'] == [6, 4, 16], state['tables']
        source = json.loads(Path('components/careers-data.json').read_text())
        expected_refs = [entry for slide in source['values']['slides'] for entry in slide['paragraph'].split('\n')]
        assert len(state['references']) == 26 and set(state['references']) == set(expected_refs)
        assert not state['brokenAnchors'] and state['notesHighlighted']
        assert state['stats'] == ['2 m', '22 weeks', '220']
        assert state['stageRails'] == state['footers'] == 1
        assert len(state['placeholders']) == 4
        for item in state['placeholders']:
            assert item['height'] == 180 and abs(float(item['width'].replace('px', '')) - item['parentWidth']) <= 1, item
            assert (item['background'], item['color'], item['border'], item['radius'], item['shadow'], item['display'], item['align'], item['justify']) == ('rgb(255, 255, 255)', 'rgb(0, 0, 0)', '0px', '0px', 'none', 'flex', 'center', 'center'), item
        hero = js("""({
          title:document.querySelector('#title-block h1').innerText,
          labels:[...document.querySelectorAll('#title-block dt')].map(e=>e.textContent),
          poster:document.querySelector('#title-block img').getAttribute('src'),
          imagePlaceholder:document.querySelector('#title-block img').getAttribute('alt')
        })""")
        assert hero['title'] == 'Provisions\nPoint', hero
        assert hero['labels'] == ['Website title', 'Design Area', 'Project Opportunity', 'How Might We statement', 'Tutorial number and zone', 'Group name', 'Keywords'], hero
        assert hero['poster'] == '/assets/report/insert-image.svg' and hero['imagePlaceholder'] == 'insert image', hero
        shot('report-' + str(width))
        for label, section in nav:
            navigate(label, section)
            if section in ['summary', 'options', 'cost']:
                shot('report-' + str(width) + '-' + section)
        # Verify the material tabs by mouse and keyboard.
        navigate('Summary', 'summary')
        if width < 768:
            button = next(n for n in cdp('Accessibility.getFullAXTree')['nodes'] if n.get('role', {}).get('value') == 'button' and n.get('name', {}).get('value') == 'Next summary item')
            cdp('DOM.scrollIntoViewIfNeeded', backendNodeId=button['backendDOMNodeId'])
            click_named('button', 'Next summary item')
            current = next(n for n in cdp('Accessibility.getFullAXTree')['nodes'] if n.get('role', {}).get('value') == 'tab' and n.get('name', {}).get('value') == 'Other')
            cdp('DOM.focus', backendNodeId=current['backendDOMNodeId'])
        else:
            tab = next(n for n in cdp('Accessibility.getFullAXTree')['nodes'] if n.get('role', {}).get('value') == 'tab' and n.get('name', {}).get('value') == 'Other')
            # Scroll the original sticky scene naturally; direct DOM scrolling
            # can overshoot a child whose sticky parent changes position.
            for attempt in range(8):
                box = cdp('DOM.getBoxModel', backendNodeId=tab['backendDOMNodeId'])['model']['content']
                center = sum(box[1::2]) / 4
                if 150 < center < 800:
                    break
                cdp('Input.dispatchMouseEvent', type='mouseWheel', x=width / 2, y=800, deltaX=0, deltaY=center - 450)
                time.sleep(.25)
            click_named('tab', 'Other')
        assert js("document.querySelector('[role=tabpanel]:not([hidden])').textContent").startswith('Other materials:')
        cdp('Input.dispatchKeyEvent', type='keyDown', key='ArrowRight', code='ArrowRight', windowsVirtualKeyCode=39)
        cdp('Input.dispatchKeyEvent', type='keyUp', key='ArrowRight', code='ArrowRight', windowsVirtualKeyCode=39)
        assert js("document.querySelector('[role=tabpanel]:not([hidden])').textContent").startswith('Estimated total cost:')
        # Verify both carousels move using their real controls.
        for label, section, rail_label in [('Design', 'design', 'detailed design'), ('Delivery', 'implementation', 'project stages')]:
            navigate(label, section)
            button = next(n for n in cdp('Accessibility.getFullAXTree')['nodes'] if n.get('role', {}).get('value') == 'button' and n.get('name', {}).get('value') == 'Next ' + rail_label)
            cdp('DOM.scrollIntoViewIfNeeded', backendNodeId=button['backendDOMNodeId'])
            before = js("document.querySelector('[aria-label=" + json.dumps(rail_label) + "]').scrollLeft")
            click_named('button', 'Next ' + rail_label)
            time.sleep(.3)
            after = js("document.querySelector('[aria-label=" + json.dumps(rail_label) + "]').scrollLeft")
            assert after > before, (rail_label, before, after)
        navigate('Background', 'background')
        navigate('Options', 'options')
        # Matrix figures are deliberately preserved and checked at their own section.
        open_menu()
        cdp('Input.dispatchKeyEvent', type='keyDown', key='Escape', code='Escape', windowsVirtualKeyCode=27)
        cdp('Input.dispatchKeyEvent', type='keyUp', key='Escape', code='Escape', windowsVirtualKeyCode=27)
        assert js("document.querySelector('button[aria-controls=report-navigation]').getAttribute('aria-expanded')") == 'false'
        errors = js('window.__reportErrors')
        assert not errors, errors
        state['consoleErrors'] = errors
        results.append(state)
    output.joinpath('report-browser.json').write_text(json.dumps(results, indent=2))
    print(json.dumps({'passed': True, 'widths': [r['width'] for r in results], 'sectionCount': len(expected_ids), 'referenceCount': 26, 'costRows': 16, 'consoleErrors': 0, 'anchorsTabsCarousels': 'passed'}))
finally:
    cdp('Emulation.setFocusEmulationEnabled', enabled=False)
