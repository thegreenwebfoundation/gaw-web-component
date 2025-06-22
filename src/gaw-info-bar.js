// TODO:
// - Remove the lat-lon
// - Replace with the zone name (zoneName) from API (include a lookup via EMaps Zone endpoint)
// - Remove the updated date

import { LitElement, css, html } from "lit";
import { zones } from "./helpers/zones";
import marker from "./assets/marker.svg";
import info from "./assets/info.svg";

export class GawInfoBar extends LitElement {
  static get properties() {
    return {
      location: { type: String },
      gridLevelText: { type: String },
      autoMode: { type: Boolean }, // Add this property to track auto mode state
    };
  }

  constructor() {
    super();
    this.location = "Location unknown";
    this.circleFill = "#B0AA9C";
    this.autoMode = true;
    this.gridLevelText = "Your local grid: Data unavailable";
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
          <div class="divider">
            <svg
              class="icon"
              viewBox="0 0 100 100"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="40" fill="${this.circleFill}" />
            </svg>
          </div>
            <div class="split-content">
              <p>${this.gridLevelText}</p>
              <img class="icon" src=${info} />
            </div>
          </div>
        </div>
        <div>
          <div class="holder">
            <div class="divider" id="gaw-info-bar-auto">
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
              <button id="gaw-info-bar-settings-manual-low" ?disabled="${this.autoMode}">
                Low
              </button>
              <button id="gaw-info-bar-settings-manual-moderate" ?disabled="${this.autoMode}">
                Moderate
              </button>
              <button id="gaw-info-bar-settings-manual-high" ?disabled="${this.autoMode}">
                High
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _formatLocation(location) {
    let locationString = location.toString();
    try {
      const locationObject = zones[locationString];
      if (locationObject.shortName) {
        return locationObject.shortName;
      } else if (locationObject.zoneName) {
        return locationObject.zoneName;
      } else {
        return locationObject.country;
      }
    } catch (e) {
      console.error(e);
      return locationString;
    }
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

    try {
      this.location = this._formatLocation(location);
    } catch (e) {
      console.log("Error formatting location:", e);
    }

    try {
      if (level === "low") {
        this.circleFill = "#86CA7A";
        this.gridLevelText = "Your local grid: Cleaner than average.";
      } else if (level === "moderate") {
        this.circleFill = "#ECA75D";
        this.gridLevelText = "Your local grid: Around average emissions.";
      } else if (level === "high") {
        this.circleFill = "#E4A08A";
        this.gridLevelText = "Your local grid: Dirtier than average.";
      }
    } catch (e) {
      console.log(e);
    }

    if (this.location.toLowerCase() === "location unknown") {
      this.autoMode = false;
    }
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0.5rem 1rem;
        font-family: monospace;
        max-width: 1920px;
        text-transform: uppercase;
        /* flex-wrap: wrap-reverse; */
      }

      :host > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      :host > .wrapper {
        max-width: 600px;
      }

      .holder {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        border: 1px solid #b8bcb5;
      }

      .holder > * {
        padding-block: 0.25rem;
        padding-inline: 0.75rem;
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

      div.divider:after {
        content: "";
        position: absolute;
        height: calc(100% + 1rem);
        width: 1px;
        background-color: #b8bcb5;
        top: -0.5rem;
        right: -0.25rem;
      }

      .split-content {
        postion: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        /* justify-content: center; */
      }

      .split-content > * {
        padding-inline: 0.25rem;
        position: relative;
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
