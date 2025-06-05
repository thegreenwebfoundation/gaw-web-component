import { LitElement, css, html } from "lit";
import litLogo from "./assets/lit.svg";
import viteLogo from "/vite.svg";
import marker from "./assets/marker.svg";
import info from "./assets/info.svg";
import circle_gray from "./assets/circle_gray.svg";
import circle_green from "./assets/circle_green.svg";
import circle_red from "./assets/circle_red.svg";
import circle_organge from "./assets/circle_orange.svg";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class GawInfoBar extends LitElement {
  static get properties() {
    return {
      /**
       * Copy for the read the docs hint.
       */
      docsHint: { type: String },

      /**
       * The number of times the button has been clicked.
       */
      count: { type: Number },
      circle: { type: HTMLElement },
    };
  }

  constructor() {
    super();
    this.docsHint = "Click on the Vite and Lit logos to learn more";
    this.count = 0;
    this.location = "";
    this.circle = null;
    this.gridLevelText = "";
    this.updatedAt = "";
    this.addEventListener("load", this._init());
  }

  render() {
    return html`
      <!-- <div>
        <a href="https://vite.dev" target="_blank">
          <img src=${viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button @click=${this._onClick} part="button">
          count is ${this.count}
        </button>
      </div>
      <p class="read-the-docs">${this.docsHint}</p> -->

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
          <div class="divider">
            <img class="icon" src=${info} />
            <p>Grid-aware design</p>
            <input
              type="checkbox"
              checked
              id="gaw-info-bar-settings-auto-checkbox"
            />
          </div>
          <div class="spaced">
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

  _onClick() {
    this.count++;
  }

  _formatLatLon(location) {
    // Parse the values to numbers
    const lat = parseFloat(location.lat);
    const lon = parseFloat(location.lon);

    // Determine the directions and get integer values by truncating at decimal point
    const latDirection = lat >= 0 ? "N" : "S";
    const lonDirection = lon >= 0 ? "E" : "W";
    const latValue = Math.abs(parseInt(lat));
    const lonValue = Math.abs(parseInt(lon));

    return `${latDirection}${latValue}° ${lonDirection}${lonValue}°`;
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

  _init() {
    try {
      if (gridAware.location && typeof gridAware.location === "string") {
        this.location = gridAware.location;
      } else if (
        gridAware.location &&
        gridAware.location.lat &&
        gridAware.location.lon
      ) {
        this.location = this._formatLatLon(gridAware.location);
      }
    } catch (e) {}

    try {
      if (gridAware.level === "low") {
        this.circle = html`<img class="icon" src=${circle_green} />`;
        this.gridLevelText = "Local energy grid cleaner than average.";
      } else if (gridAware.level === "moderate") {
        this.circle = html`<img class="icon" src=${circle_organge} />`;
        this.gridLevelText = "Local energy grid intensity around average.";
      } else if (gridAware.level === "high") {
        this.circle = html`<img class="icon" src=${circle_red} />`;
        this.gridLevelText = "Local energy grid dirtier than average.";
      }
    } catch (e) {
      console.log(e);
      this.circle = html`<img class="icon" src=${circle_gray} />`;
    }

    try {
      if (gridAware.datetime) {
        this.updatedAt = `Updated at ${this._formatDateTime(gridAware.datetime)}`;
      }
    } catch (e) {}
  }

  static get styles() {
    return css`
      /* :host {
        max-width: 100%;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }

      .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
      .logo.lit:hover {
        filter: drop-shadow(0 0 2em #325cffaa);
      }

      .card {
        padding: 2em;
      }

      .read-the-docs {
        color: #888;
      }

      a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
      }
      a:hover {
        color: #535bf2;
      }

      ::slotted(h1) {
        font-size: 3.2em;
        line-height: 1.1;
      }

      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
      }
      button:hover {
        border-color: #646cff;
      }
      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }

      @media (prefers-color-scheme: light) {
        a:hover {
          color: #747bff;
        }
        button {
          background-color: #f9f9f9;
        }
      } */

      :host {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem 1rem;
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
    `;
  }
}

window.customElements.define("gaw-info-bar", GawInfoBar);
