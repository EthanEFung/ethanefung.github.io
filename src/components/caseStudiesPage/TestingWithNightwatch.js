import React from 'react';
import classNames from 'classnames';
import Code from '../Code';

export default function TestingWithNightwatch(props) {

    const classes = classNames(
      props.className,
      'o-content',
      'c-case-study',
      'u-text--light'
    );
  
    return (
      <article className={classes}>
      <div className='c-case-study__container'>
        <header className='c-case-study__header'>
          <h1 className='c-case-study__title'>Testing With Nightwatch</h1>
          <h2 className='c-case-study__tag'>A Case for Object-Oriented Programming</h2>
        </header>
        <section className='c-case-study__content'>
          <p>
            Nightwatch.js is an end-to-end testing framework built on the w3c webdriver
            API. While conceptually, writing tests is easy to understand, 
            writing end-to-ends for complex workflows can be tedious when reliant solely
            on chaining.
          </p>
          <p>
            Nightwatch relies heavily on method chaining, and the use of css selectors
            to drive nightwatch commands and assertions on DOM elements. Here is a
            sample of how to write a test in Nighwatch:
          </p>
          <Code>{`
  'Checks Carrier Load Info Card on Delivered Loads Tab': (browser) => {
    browser
      .waitForElementPresent('.test-sourcing-link', 5000)
      .click('.test-sourcing-link')
      .waitForElementVisible('#test-delivered', 5000)
      .click('#test-delivered')
      .waitForElementVisible('select[name*="loadStatus"]', 10000)
  },
          `}</Code>
          <p>
            Seems simple enough. However, by detailing workflows with significant 
            complexity, the over all readability of the code suffers and thus the
            maintainability of the test.
          </p>
          <Code>{`
  'Creates a load when successful': (browser) => {
    browser
      .waitForElementNotVisible('.test-tab-loader', 5000)
      .waitForElementVisible('.js-open-loads-menu', 5000)
      .click('.js-open-loads-menu')
      .waitForElementVisible('#add-load-manually', 1500)
      .click('#add-load-manually')

      .waitForElementVisible('input[name*="business_name"]', 3000)
      .setValue('input[name="miles"]', 1)

      .setValue('.pickup-0 input[name*="business_name"]', '1st pickup')
      .setValue('.pickup-0 input[name*="address"]', '1')

      .waitForElementVisible('.pickup-0 .test-pickup-city .Select-input input', 5000)
      .setValue('.pickup-0 .test-pickup-city .Select-input input', 'Amherst')
      .pause(2000)
      .click('.pickup-0 .test-pickup-city')
      .waitForElementVisible('.pickup-0 .test-pickup-city .Select-option[id*="-option-0"]', 5000)
      .click('.pickup-0 .test-pickup-city .Select-option[id*="-option-0"]')
      .click('.pickup-0 .test-pickup-zip')
      .waitForElementVisible('.pickup-0 .test-pickup-zip .Select-option[id*="-option-0"]', 5000)
      .click('.pickup-0 .test-pickup-zip .Select-option[id*="-option-0"]')

      .setValue('.pickup-0 input[name*="contact_name"]', 'Test Guy')
      .setValue('.pickup-0 input[name*="contact_phone"]', '4243424343')

      .clearValue('input[name="loadLocations.0.time_start"]')
      .setValue('input[name="loadLocations.0.time_start"]', '0200')

      .clearValue('input[name="loadLocations.0.time_end"]')
      .setValue('input[name="loadLocations.0.time_end"]', '0700')

      .click('.js-add-pickup')
      .getValue('input[name="id"]', function(result) {
        this.assert.equal(result.status, 0);
        newLoadId = result.value;
      })

      .waitForElementVisible('.pickup-1 input[name*="business_name"]', 3000)

      ...

      
          `}</Code>
          <p>
            Perhaps the answer then is to simplify workflows by creating variables:
          </p>
          <Code>{`
  const loadId = getLoadId();
  const loadSelector = \`div[data-load-id="\${loadId}"]\`;
  browser
    .waitForElementPresent('.test-sourcing-link', 10000)
    .click('.test-sourcing-link')
    .waitForElementPresent(loadSelector, 5000)
    .waitForElementVisible(\`\${loadSelector} .test-load-id\`, 3000);
          `}</Code>
          <p>
            That might work. However, I can tell you from first hand experience that
            the overall length of the test is unaffected. Despite trying to simplify
            the logic, sometimes by adding variables the readability worsens.
          </p>
          <Code>{`
  'Send Load Info to Carrier': (browser, loadID, mainDone) => {
    const loadSelector = \`div[data-load-id="\${loadID}"]\`;
    const viewCarriersWrapperSelector = \`\${loadSelector} .test-view-carriers\`;
    const carrierTypeDropdownSelector = \`
      \${viewCarriersWrapperSelector} .test-carrier-type
    \`;
    const allCarriersSelector = \`
      \${carrierTypeDropdownSelector} option[value="all"]
    \`;
    const nonAllInCarrierSelector = \`
      \${viewCarriersWrapperSelector}
      .test-carrier-card[data-carrier-id="\${nonAllInCarrierId}"]
    \`;
    const carrierSelector = \`
      \${viewCarriersWrapperSelector}
      .test-carrier-card[data-carrier-id="\${carrierId}"]
    \`;
    const carrierNameSelector = \`
      \${carrierSelector} .test-carrier-name
    \`;
    const pickCarrierSelector = \`
      \${carrierSelector} .test-pick-carrier input[type="checkbox"]
    \`;
  
    browser
      .waitForElementVisible(\`\${loadSelector} .test-card-dropdown\`, 5000)
      .click(\`\${loadSelector} .test-card-dropdown\`)
      .waitForElementVisible('.js-open-map', 5000)

      ...


          `}</Code>
          <p>
            Obviously, this example is a worst case scenario, but it does show
            the type complexity developers face writing tests in chains. So, how
            can solve this issue? 
          </p>
          <hr />
          <p>
            Its common in many codebases today to have components that are shared
            in various places in the app. We can do with this knowledge is to create
            webpage objects and create methods that run commands and assertions
            that are specific to that component.

            Recently Nightwatch has been adding support for page objects. But like our
            development team a simple solution could be creating webpage objects as js
            classes and declaring commands specific to each component.

          </p>
          <Code>{`
  export class WebPageSpecificForm {
    constructor(browser, loadId) {
      this.loadId = loadId;
      this.browser = browser;
    }
    assertFormValues(values) {
      // have complex logic specific to this web form
    }
    clickIcon(name) {
      // have complex logic specific to this web form
    }
    submitForm() {
      // have complex logic specific to this web form
    }
  }
          `}</Code>
          <p>
            This makes it fairly easy then to replicate complex workflows
            with variations. And debugging becomes easier due to the narrowing
            of scope. Say for example, if a test fails to click on a specific icon,
            a developer can check the `clickIcon` method to find the issue there.
            What results is code that encompasses a great deal of complexity that 
            improves a little in readability.
          </p>
          <Code>{`
  'BACO can view most recent active load location': (browser) => {
    const {load, pickupCity, deliveryCity} = data;

    const loadCard = new LoadCard(browser, load.get('id')); // page object
    loadCard.clickIcon('load active location');

    browser.waitForElementVisible('.active-locations-modal');

    const modal = new ActiveLoadLocationModal(browser); // page object
    modal.assertLocationValues({
      title: 'ACTIVE LOAD LOCATION',
      loadId: load.get('iid'),
      origin: pickupCity.name,
      lastLocation: pickupCity.name,
      destination: deliveryCity.name
    });
    modal.assertFormNotPresent();
    modal.close();
  },
          `}</Code>
        </section>
        </div>
      </article>
  );
}