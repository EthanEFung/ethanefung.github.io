import React, {useEffect} from 'react';
import classNames from 'classnames';
import Code from '../Code';

export default function TestingWithNightwatch(props) {
    useEffect(() => {
      window.scrollTo(0, 0);
    })

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
  'Checks User on Profile Tab': (browser) => {
    browser
      .waitForElementPresent('.test-source-link', 5000)
      .click('.test-sourcing-link')
      .waitForElementVisible('#test-user', 5000)
      .click('#test-user')
      .waitForElementVisible('select[name*="userStatus"]', 10000)
  },
          `}</Code>
          <p>
            Seems simple enough. However, by detailing workflows with significant 
            complexity, the over all readability of the code suffers and thus the
            maintainability of the test.
          </p>
          <Code>{`
  'Creates a destination': (browser) => {
    browser
      .waitForElementNotVisible('.test-tab-loader', 5000)
      .waitForElementVisible('.js-open-menu', 5000)
      .click('.open-menu')

      .waitForElementVisible('#add-manually', 1500)
      .click('#add-manually')

      .waitForElementVisible('input[name*="business_name"]', 3000)
      .setValue('input[name="miles"]', 1)

      .setValue('.pickup-0 input[name*="business_name"]', '1st pickup')
      .setValue('.pickup-0 input[name*="address"]', '1')

      .waitForElementVisible('.pickup-0 .test-pickup-city .Select-input input', 5000)
      .setValue('.pickup-0 .test-pickup-city .Select-input input', 'Los Angeles')

      .pause(2000)

      .click('.pickup-0 .test-pickup-city')
      .waitForElementVisible('.pickup-0 .test-pickup-city .Select-option[id*="-option-0"]', 5000)
      .click('.pickup-0 .test-pickup-city .Select-option[id*="-option-0"]')
      .click('.pickup-0 .test-pickup-zip')

      .waitForElementVisible('.pickup-0 .test-pickup-zip .Select-option[id*="-option-0"]', 5000)
      .click('.pickup-0 .test-pickup-zip .Select-option[id*="-option-0"]')

      .setValue('.pickup-0 input[name*="contact_name"]', 'Test Contact')
      .setValue('.pickup-0 input[name*="contact_phone"]', '4243424343')

      .clearValue('input[name="userLocations.0.time_start"]')
      .setValue('input[name="userLocations.0.time_start"]', '0200')

      .clearValue('input[name="userLocations.0.time_end"]')
      .setValue('input[name="userLocations.0.time_end"]', '0700')

      .click('.js-add-pickup')
      .getValue('input[name="id"]', function(result) {
        this.assert.equal(result.status, 0);
        newUserId = result.value;
      })

      .waitForElementVisible('.pickup-1 input[name*="business_name"]', 3000)

      ...

      
          `}</Code>
          <p>
            Perhaps the answer then is to simplify workflows by creating variables:
          </p>
          <Code>{`
  const userId = getuserId();
  const userSelector = \`div[data-user-id="\${userId}"]\`;
  browser
    .waitForElementPresent('.test-sourcing-link', 10000)
    .click('.test-sourcing-link')
    .waitForElementPresent(userSelector, 5000)
    .waitForElementVisible(\`\${userSelector} .test-user-id\`, 3000);
          `}</Code>
          <p>
            That might work. However, I can tell you from first hand experience that
            the overall length of the test is unaffected. Despite trying to simplify
            the logic, sometimes by adding variables the readability worsens.
          </p>
          <Code>{`
  'Send Info to user': (browser, userId, mainDone) => {
    const userSelector = \`div[data-user-id="\${userId}"]\`;
    const viewUserWrapperSelector = \`\${userSelector} .test-view-users\`;
    const userTypeDropdownSelector = \`
      \${viewUserWrapperSelector} .test-user-type
    \`;
    const allusersSelector = \`
      \${userTypeDropdownSelector} option[value="all"]
    \`;
    const nonAllInuserSelector = \`
      \${viewUserWrapperSelector}
      .test-user-card[data-user-id="\${nonAllInuserId}"]
    \`;
    const userSelector = \`
      \${viewUserWrapperSelector}
      .test-user-card[data-user-id="\${userId}"]
    \`;
    const userNameSelector = \`
      \${userSelector} .test-user-name
    \`;
    const pickuserSelector = \`
      \${userSelector} .test-pick-user input[type="checkbox"]
    \`;
  
    browser
      .waitForElementVisible(\`\${userSelector} .test-card-dropdown\`, 5000)
      .click(\`\${userSelector} .test-card-dropdown\`)
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
            in various places in the app. What we can do with this knowledge is create
            webpage objects with methods that are specific to that component.

            Recently Nightwatch has been adding support for page objects. But like our
            development team a simple solution could be creating webpage objects as js
            classes and declaring methods specific to each component.

          </p>
          <Code>{`
  export class WebPageSpecificForm {
    constructor(browser, userId) {
      this.userId = userId;
      this.browser = browser;
    }
    assertFormValues(values) {
      // have complex logic specific to this web form
    }
    clickIcon(name) {

    }
    submitForm() {

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
  'Can view most recent active user location': (browser) => {
    const {user, pickupCity, deliveryCity} = data;

    const userCard = new userCard(browser, user.get('id')); // page object
    userCard.clickIcon('user profile');

    const modal = new WebPageSpecificModal(browser); // page object
    modal.assertPresent();
    modal.assertLocationValues({
      title: 'Active User',
      userId: user.get('iid'),
      origin: pickupCity.name,
      lastLocation: pickupCity.name,
      destination: deliveryCity.name
    });
   
    modal.close();
    modal.assertNotPresent();
  },
          `}</Code>
        </section>
        </div>
      </article>
  );
}