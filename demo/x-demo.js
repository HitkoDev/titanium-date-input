import '../../iron-icons/iron-icons.js';
import '../../titanium-responsive-icon/titanium-responsive-icon.js';
import '../titanium-date-input.js';
class XDemo extends Polymer.Element {
  static get template() {
    return `
        <style>
            titanium-date-input {
                margin: 16px;
            }
        </style>
        <h3>Simple Demo</h3>
        <iron-form id="form">
            <form>
                <titanium-date-input label="My Birthday" auto-validate="" required="" error-message="Please use a valid date of birth"></titanium-date-input>

                <titanium-date-input label="Mom's Birthday" required="" error-message="Mom's Birthday is bad"></titanium-date-input>

                <titanium-date-input label="Not Required" auto-validate="" error-message="ANTHONY CAN SEE THIS IS AN ERROR"></titanium-date-input>

                <h3>Prefix Slot Demo</h3>
                <titanium-date-input label="Prefix Slot" auto-validate="" required="" error-message="ANTHONY CAN SEE THIS IS AN ERROR">
                    <iron-icon icon="alarm" slot="prefix">PREFIX</iron-icon>
                </titanium-date-input>

                <titanium-date-input disabled="" label="Prefix Slot" auto-validate="" required="" error-message="ANTHONY CAN SEE THIS IS AN ERROR">
                    <iron-icon icon="alarm" slot="prefix">PREFIX</iron-icon>
                </titanium-date-input>

                <titanium-date-input label="Prefix Slot" auto-validate="" required="" error-message="ANTHONY CAN SEE THIS IS AN ERROR">
                    <titanium-responsive-icon icon="alarm" slot="prefix"></titanium-responsive-icon>
                </titanium-date-input>

                <titanium-date-input label="Different Pattern and Placeholder" date-pattern="yyyy/mm/dd" placeholder="yyyy/mm/dd" auto-validate="" required="" error-message="This is Required">
                    <titanium-responsive-icon icon="alarm" slot="prefix"></titanium-responsive-icon>
                </titanium-date-input>
                <button on-click="submit">Validate this form</button>
            </form>
        </iron-form>
`;
  }

  static get is() {
      return 'x-demo';
  }

  submit(e) {
      this.$.form.validate();
  }
}

window.customElements.define(XDemo.is, XDemo);
