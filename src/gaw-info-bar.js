// TODO:
// - Remove the lat-lon
// - Replace with the zone name (zoneName) from API (include a lookup via EMaps Zone endpoint)
// - Remove the updated date

import { LitElement, css, html } from "lit";
import marker from "./assets/marker.svg";
import info from "./assets/info.svg";
import circle_gray from "./assets/circle_gray.svg";
import circle_green from "./assets/circle_green.svg";
import circle_red from "./assets/circle_red.svg";
import circle_organge from "./assets/circle_orange.svg";

export class GawInfoBar extends LitElement {
  static get properties() {
    return {
      location: { type: String },
      gridLevelText: { type: String },
      updatedAt: { type: String },
      autoMode: { type: Boolean }, // Add this property to track auto mode state
    };
  }

  constructor() {
    super();
    this.location = "";
    this.circle = null;
    this.gridLevelText = "";
    this.updatedAt = "";
    this.autoMode = true;
    this.addEventListener("load", this._init());
  }

  render() {
    return html`
      <div>
        <div class="holder">
          <div class="divider">
            <img src=${marker} class="icon" />
          </div>
          <p>${this.location}</p>
        </div>
        <div class="holder">
          <div class="divider">${this.circle}</div>
          <div class="split-content">
            <p>${this.gridLevelText}</p>
            <p>${this.updatedAt}</p>
          </div>
        </div>
      </div>
      <div>
        <div class="holder">
          <div class="divider" id="gaw-info-bar-auto">
            <img class="icon" src=${info} />
            <p>Grid-aware design</p>
            <label>
              <input
                type="checkbox"
                ?checked="${this.autoMode}"
                id="gaw-info-bar-settings-auto-toggle"
                @change="${this._handleAutoToggleChange}"
              />
              Auto
            </label>
          </div>
          <div id="gaw-info-bar-manual" class="spaced">
            <button id="gaw-info-bar-settings-manual-low" disabled>Low</button>
            <button id="gaw-info-bar-settings-manual-moderate" disabled>
              Moderate
            </button>
            <button id="gaw-info-bar-settings-manual-high" disabled>
              High
            </button>
          </div>
        </div>
      </div>
    `;
  }

  _formatLocation(location) {
    // Handle coordinate format
    if (location.trim().startsWith("[") && location.trim().endsWith("]")) {
      location = JSON.parse(location);
      const lat = parseFloat(location[0]);
      const lon = parseFloat(location[1]);
      const latDirection = lat >= 0 ? "N" : "S";
      const lonDirection = lon >= 0 ? "E" : "W";
      const latValue = Math.abs(parseInt(lat));
      const lonValue = Math.abs(parseInt(lon));
      return `${latDirection}${latValue}° ${lonDirection}${lonValue}°`;
    }

    // Use Intl.DisplayNames API for country codes
    if (typeof Intl !== "undefined" && Intl.DisplayNames) {
      const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

      return location.replace(/[A-Z]{2}/g, (match) => {
        try {
          return regionNames.of(match) || match;
        } catch (e) {
          return match;
        }
      });
    } else {
      // Fallback for browsers that don't support Intl.DisplayNames
      // Using a Map for better performance than the chain of replaces
      const countryMap = new Map([
        ["AF", "Afghanistan"],
        ["AL", "Albania"],
        ["DZ", "Algeria"],
        ["AS", "American Samoa"],
        ["AD", "Andorra"],
        ["AO", "Angola"],
        ["AI", "Anguilla"],
        ["AQ", "Antarctica"],
        ["AG", "Antigua and Barbuda"],
        ["AR", "Argentina"],
        ["AM", "Armenia"],
        ["AW", "Aruba"],
        ["AU", "Australia"],
        ["AT", "Austria"],
        ["AZ", "Azerbaijan"],
        ["BS", "Bahamas"],
        ["BH", "Bahrain"],
        ["BD", "Bangladesh"],
        ["BB", "Barbados"],
        ["BY", "Belarus"],
        ["BE", "Belgium"],
        ["BZ", "Belize"],
        ["BJ", "Benin"],
        ["BM", "Bermuda"],
        ["BT", "Bhutan"],
        ["BO", "Bolivia (Plurinational State of)"],
        ["BQ", "Bonaire, Sint Eustatius and Saba"],
        ["BA", "Bosnia and Herzegovina"],
        ["BW", "Botswana"],
        ["BV", "Bouvet Island"],
        ["BR", "Brazil"],
        ["IO", "British Indian Ocean Territory"],
        ["BN", "Brunei Darussalam"],
        ["BG", "Bulgaria"],
        ["BF", "Burkina Faso"],
        ["BI", "Burundi"],
        ["CV", "Cabo Verde"],
        ["KH", "Cambodia"],
        ["CM", "Cameroon"],
        ["CA", "Canada"],
        ["KY", "Cayman Islands"],
        ["CF", "Central African Republic"],
        ["TD", "Chad"],
        ["CL", "Chile"],
        ["CN", "China"],
        ["CX", "Christmas Island"],
        ["CC", "Cocos (Keeling) Islands"],
        ["CO", "Colombia"],
        ["KM", "Comoros"],
        ["CD", "Congo (the Democratic Republic of the)"],
        ["CG", "Congo"],
        ["CK", "Cook Islands"],
        ["CR", "Costa Rica"],
        ["HR", "Croatia"],
        ["CU", "Cuba"],
        ["CW", "Curaçao"],
        ["CY", "Cyprus"],
        ["CZ", "Czechia"],
        ["CI", "Côte d'Ivoire"],
        ["DK", "Denmark"],
        ["DJ", "Djibouti"],
        ["DM", "Dominica"],
        ["DO", "Dominican Republic"],
        ["EC", "Ecuador"],
        ["EG", "Egypt"],
        ["SV", "El Salvador"],
        ["GQ", "Equatorial Guinea"],
        ["ER", "Eritrea"],
        ["EE", "Estonia"],
        ["SZ", "Eswatini"],
        ["ET", "Ethiopia"],
        ["FK", "Falkland Islands"],
        ["FO", "Faroe Islands"],
        ["FJ", "Fiji"],
        ["FI", "Finland"],
        ["FR", "France"],
        ["GF", "French Guiana"],
        ["PF", "French Polynesia"],
        ["TF", "French Southern Territories"],
        ["GA", "Gabon"],
        ["GM", "Gambia"],
        ["GE", "Georgia"],
        ["DE", "Germany"],
        ["GH", "Ghana"],
        ["GI", "Gibraltar"],
        ["GR", "Greece"],
        ["GL", "Greenland"],
        ["GD", "Grenada"],
        ["GP", "Guadeloupe"],
        ["GU", "Guam"],
        ["GT", "Guatemala"],
        ["GG", "Guernsey"],
        ["GN", "Guinea"],
        ["GW", "Guinea-Bissau"],
        ["GY", "Guyana"],
        ["HT", "Haiti"],
        ["HM", "Heard Island and McDonald Islands"],
        ["VA", "Holy See"],
        ["HN", "Honduras"],
        ["HK", "Hong Kong"],
        ["HU", "Hungary"],
        ["IS", "Iceland"],
        ["IN", "India"],
        ["ID", "Indonesia"],
        ["IR", "Iran (Islamic Republic of)"],
        ["IQ", "Iraq"],
        ["IE", "Ireland"],
        ["IM", "Isle of Man"],
        ["IL", "Israel"],
        ["IT", "Italy"],
        ["JM", "Jamaica"],
        ["JP", "Japan"],
        ["JE", "Jersey"],
        ["JO", "Jordan"],
        ["KZ", "Kazakhstan"],
        ["KE", "Kenya"],
        ["KI", "Kiribati"],
        ["KP", "Korea (the Democratic People's Republic of)"],
        ["KR", "Korea (the Republic of)"],
        ["KW", "Kuwait"],
        ["KG", "Kyrgyzstan"],
        ["LA", "Lao People's Democratic Republic"],
        ["LV", "Latvia"],
        ["LB", "Lebanon"],
        ["LS", "Lesotho"],
        ["LR", "Liberia"],
        ["LY", "Libya"],
        ["LI", "Liechtenstein"],
        ["LT", "Lithuania"],
        ["LU", "Luxembourg"],
        ["MO", "Macao"],
        ["MG", "Madagascar"],
        ["MW", "Malawi"],
        ["MY", "Malaysia"],
        ["MV", "Maldives"],
        ["ML", "Mali"],
        ["MT", "Malta"],
        ["MH", "Marshall Islands"],
        ["MQ", "Martinique"],
        ["MR", "Mauritania"],
        ["MU", "Mauritius"],
        ["YT", "Mayotte"],
        ["MX", "Mexico"],
        ["FM", "Micronesia (Federated States of)"],
        ["MD", "Moldova (the Republic of)"],
        ["MC", "Monaco"],
        ["MN", "Mongolia"],
        ["ME", "Montenegro"],
        ["MS", "Montserrat"],
        ["MA", "Morocco"],
        ["MZ", "Mozambique"],
        ["MM", "Myanmar"],
        ["NA", "Namibia"],
        ["NR", "Nauru"],
        ["NP", "Nepal"],
        ["NL", "Netherlands"],
        ["NC", "New Caledonia"],
        ["NZ", "New Zealand"],
        ["NI", "Nicaragua"],
        ["NE", "Niger"],
        ["NG", "Nigeria"],
        ["NU", "Niue"],
        ["NF", "Norfolk Island"],
        ["MK", "North Macedonia"],
        ["MP", "Northern Mariana Islands"],
        ["NO", "Norway"],
        ["OM", "Oman"],
        ["PK", "Pakistan"],
        ["PW", "Palau"],
        ["PS", "Palestine"],
        ["PA", "Panama"],
        ["PG", "Papua New Guinea"],
        ["PY", "Paraguay"],
        ["PE", "Peru"],
        ["PH", "Philippines"],
        ["PN", "Pitcairn"],
        ["PL", "Poland"],
        ["PT", "Portugal"],
        ["PR", "Puerto Rico"],
        ["QA", "Qatar"],
        ["RO", "Romania"],
        ["RU", "Russian Federation"],
        ["RW", "Rwanda"],
        ["RE", "Réunion"],
        ["BL", "Saint Barthélemy"],
        ["SH", "Saint Helena, Ascension and Tristan da Cunha"],
        ["KN", "Saint Kitts and Nevis"],
        ["LC", "Saint Lucia"],
        ["MF", "Saint Martin (French part)"],
        ["PM", "Saint Pierre and Miquelon"],
        ["VC", "Saint Vincent and the Grenadines"],
        ["WS", "Samoa"],
        ["SM", "San Marino"],
        ["ST", "Sao Tome and Principe"],
        ["SA", "Saudi Arabia"],
        ["SN", "Senegal"],
        ["RS", "Serbia"],
        ["SC", "Seychelles"],
        ["SL", "Sierra Leone"],
        ["SG", "Singapore"],
        ["SX", "Sint Maarten (Dutch part)"],
        ["SK", "Slovakia"],
        ["SI", "Slovenia"],
        ["SB", "Solomon Islands"],
        ["SO", "Somalia"],
        ["ZA", "South Africa"],
        ["GS", "South Georgia and the South Sandwich Islands"],
        ["SS", "South Sudan"],
        ["ES", "Spain"],
        ["LK", "Sri Lanka"],
        ["SD", "Sudan"],
        ["SR", "Suriname"],
        ["SJ", "Svalbard and Jan Mayen"],
        ["SE", "Sweden"],
        ["CH", "Switzerland"],
        ["SY", "Syrian Arab Republic"],
        ["TW", "Taiwan"],
        ["TJ", "Tajikistan"],
        ["TZ", "Tanzania, United Republic of"],
        ["TH", "Thailand"],
        ["TL", "Timor-Leste"],
        ["TG", "Togo"],
        ["TK", "Tokelau"],
        ["TO", "Tonga"],
        ["TT", "Trinidad and Tobago"],
        ["TN", "Tunisia"],
        ["TR", "Turkey"],
        ["TM", "Turkmenistan"],
        ["TC", "Turks and Caicos Islands"],
        ["TV", "Tuvalu"],
        ["UG", "Uganda"],
        ["UA", "Ukraine"],
        ["AE", "United Arab Emirates"],
        ["GB", "United Kingdom"],
        ["UK", "United Kingdom"],
        ["UM", "United States Minor Outlying Islands"],
        ["US", "United States"],
        ["UY", "Uruguay"],
        ["UZ", "Uzbekistan"],
        ["VU", "Vanuatu"],
        ["VE", "Venezuela"],
        ["VN", "Viet Nam"],
        ["VG", "Virgin Islands (British)"],
        ["VI", "Virgin Islands (U.S.)"],
        ["WF", "Wallis and Futuna"],
        ["EH", "Western Sahara"],
        ["YE", "Yemen"],
        ["ZM", "Zambia"],
        ["ZW", "Zimbabwe"],
        ["AX", "Åland Islands"],
      ]);

      return location.replace(
        /[A-Z]{2}/g,
        (match) => countryMap.get(match) || match,
      );
    }
  }

  _formatDateTime(dateString) {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return formatter.format(date);
  }

  /**
   * Handles changes to the auto toggle checkbox
   * @param {Event} event - The change event
   * @private
   */
  _handleAutoToggleChange(event) {
    this.autoMode = event.target.checked;

    // Update UI based on auto mode state
    const manualButtons = this.shadowRoot.querySelectorAll(
      "#gaw-info-bar-manual button",
    );
    manualButtons.forEach((button) => {
      button.disabled = this.autoMode;
    });

    // Dispatch a custom event to notify consumers of the change
    this.dispatchEvent(
      new CustomEvent("auto-mode-changed", {
        detail: { autoMode: this.autoMode },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _init() {
    const level = this.dataset.gawLevel;
    const location = this.dataset.gawLocation;
    const datetime = this.dataset.gawDatetime;

    try {
      this.location = this._formatLocation(location);
    } catch (e) {
      console.log("Error formatting location:", e);
    }

    try {
      if (level === "low") {
        this.circle = html`<img class="icon" src=${circle_green} />`;
        this.gridLevelText = "Local energy grid cleaner than average.";
      } else if (level === "moderate") {
        this.circle = html`<img class="icon" src=${circle_organge} />`;
        this.gridLevelText = "Local energy grid intensity around average.";
      } else if (level === "high") {
        this.circle = html`<img class="icon" src=${circle_red} />`;
        this.gridLevelText = "Local energy grid dirtier than average.";
      }
    } catch (e) {
      console.log(e);
      this.circle = html`<img class="icon" src=${circle_gray} />`;
    }

    try {
      if (datetime) {
        this.updatedAt = `Updated at ${this._formatDateTime(datetime)}`;
      }
    } catch (e) {}
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 1rem;
        font-family: monospace;
        /* flex-wrap: wrap-reverse; */
      }

      :host > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .holder {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid #ccc;
      }

      .holder > * {
        padding: 0.25rem 0.5rem;
      }

      .icon {
        width: 1.5rem;
        height: 1.5rem;
        position: relative;
      }

      div.divider {
        position: relative;
        display: flex;
        position-content: center;
      }

      div.divider:after,
      .split-content > *:not(:last-child):after {
        content: "";
        position: absolute;
        height: calc(100% + 1rem);
        width: 1px;
        background-color: #ccc;
        top: -0.5rem;
        right: -0.25rem;
      }

      .split-content {
        postion: relative;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 2rem;
      }

      .split-content > * {
        padding-inline: 0.25rem;
        position: relative;
      }

      .split-content > *:not(:last-child):after {
        right: -1rem;
      }

      .divider:has(input) {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
      }

      div.divider:has(input):after {
        height: calc(100% - 1rem);
        top: 0.5rem;
      }

      .spaced {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
      }

      button {
        background: none;
        border: none;
        font-family: inherit;
      }

      label:has(input) {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    `;
  }
}

window.customElements.define("gaw-info-bar", GawInfoBar);
