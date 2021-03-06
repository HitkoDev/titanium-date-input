import { Moment } from '../momentjs-es6/moment.js';
import { Element } from '../@polymer/polymer/polymer-element.js';

class TitaniumDateInput extends Element {
    static get template() {
        return `
        <style>
             :host {
                display: block;
            }

            paper-input {
                width: 100%;
                --paper-input-container: {
                    padding-bottom: 0;
                }
                ;
            }

             ::slotted(*) {
                color: #737373;
            }

            paper-input[focused] ::slotted(*) {
                --iron-icon-fill-color: var(--primary-color);
                color: var(--primary-color);
            }

            paper-input[error] ::slotted(*) {
                --iron-icon-fill-color: var(--error-color);
                color: var(--error-color);
            }

            paper-input[disabled] ::slotted(*) {
                --iron-icon-fill-color: #B6B6B6;
                color: #B6B6B6;
            }
        </style>
        <paper-input id="input" always-float-label="" placeholder="[[placeholder]]" label="[[label]]" error-message="[[errorMessage]]" required="[[required]]" allowed-pattern="[0-9\\/]" maxlength="10" value="{{value}}" disabled\$="[[disabled]]" focused\$="{{focused}}" validator="[[validator]]" invalid="{{error}}" error\$="[[error]]" date-pattern="[[datePattern]]">
            <slot name="prefix" slot="prefix"></slot>
            <slot name="suffix" slot="suffix"></slot>
        </paper-input>
`;
    }

    static get is() {
        return 'titanium-date-input';
    }

    static get properties() {
        return {
            label: {
                type: String
            },
            value: {
                type: String,
                notify: true,
                observer: '_valueChanged'
            },
            autoValidate: {
                type: Boolean,
                notify: true
            },
            required: {
                type: Boolean,
                notify: true
            },
            disabled: {
                type: Boolean,
                value: false
            },
            datePattern: {
                type: String,
                value: 'MM/DD/YYYY'
            },
            placeholder: {
                type: String,
                value: 'mm/dd/yyyy'
            },
            errorMessage: {
                type: String
            },
            focused: {
                type: Boolean,
                notify: true
            },
            validator: {
                type: String
            },
            invalid: {
                type: Boolean,
                reflectToAttribute: true,
                notify: true
            }
        };
    }

    static get observers() {
        return [
            '_onFocusedChanged(focused)'
        ];
    }

    connectedCallback() {
        super.connectedCallback();
        var regex = '';
        regex = this.datePattern.replace(/\s/g, '\\s');
        regex = regex.replace(/M/gi, '\d');
        regex = regex.replace(/D/gi, '\\d');
        regex = regex.replace(/Y/gi, '\\d');
        regex = regex.replace(/\+/g, '\\+');
        this.$.input.pattern = regex;
    }

    ready() {
        super.ready();
    }

    _valueChanged(value, oldValue) {
        if (typeof oldValue === 'undefined' || value === oldValue)
            return;

        if (typeof value === "object")
            value = Moment(value, "MM/DD/YYYY").format("MM/DD/YYYY");

        if (!value || value === oldValue)
            return;

        let originalString = value ? value.toString() : '';

        let start = this.$.input.selectionStart;
        let initialSlashesBeforeCaret = originalString.substr(0, start).split('/').length - 1;
        originalString = originalString.replace(/\//g, '');
        let shouldFormat = originalString.length <= this.datePattern.replace(/\//g, '').length;
        let formattedValue = '';
        let currentSlashIndex = 0;
        let totalSlashesAdded = 0;
        for (let i = 0; i < originalString.length; i++) {
            currentSlashIndex = this.datePattern.indexOf('/', currentSlashIndex);
            if (shouldFormat && i == (currentSlashIndex - totalSlashesAdded)) { // jshint ignore:line
                formattedValue += '/';
                currentSlashIndex++;
                totalSlashesAdded++;
            }
            formattedValue += originalString[i];
        }
        let updatedSlashesBeforeCaret = formattedValue.substr(0, start).split('/').length - 1;
        let slashesDifference = updatedSlashesBeforeCaret - initialSlashesBeforeCaret;
        this.updateValueAndPreserveCaret(formattedValue.trim());
        this.$.input.selectionStart = this.$.input.selectionEnd = start + slashesDifference;

        this.validate();
    }

    updateValueAndPreserveCaret(newValue) {
        try {
            var start = this.inputElement.selectionStart;
            this.value = newValue;
            this.inputElement.selectionStart = start;
            this.inputElement.selectionEnd = start;
        } catch (e) {
            this.value = newValue;
        }
    }

    _onFocusedChanged(focused) {
        if (!focused)
            this.validate();
    }

    validate() {
        let valid = this.$.input.validate();
        return valid;
    }
}
customElements.define(TitaniumDateInput.is, TitaniumDateInput);
