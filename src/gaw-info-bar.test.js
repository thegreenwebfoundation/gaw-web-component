import { describe, it, expect, beforeEach } from "vitest";
import { GawInfoBar } from "./gaw-info-bar.js";
import {zones} from "./helpers/zones.js"

describe("GawInfoBar._formatLocation", () => {
  /** @type {GawInfoBar} */  
  let component;

  beforeEach(() => {
    component = Object.create(GawInfoBar.prototype);
    component.dataset = {};
  });

  it("should return 'Location unknown' when location is null", () => {
    const result = component._formatLocation(null);
    expect(result).toBe("Location unknown");
  });

  it("should return 'Location unknown' when location is undefined", () => {
    const result = component._formatLocation(undefined);
    expect(result).toBe("Location unknown");
  });

  it("should return 'Location unknown' when location is empty string", () => {
    const result = component._formatLocation("");
    expect(result).toBe("Location unknown");
  });

  it("should catch exceptions and return 'Location unknown'", () => {
    const badObj = {
      toString: () => {
        throw new Error("toString failed");
      },
    };
    const result = component._formatLocation(badObj);
    expect(result).toBe("Location unknown");
  });

  it("should return original location string when zone is not found", () => {
    const result = component._formatLocation("UNKNOWN-ZONE");
    expect(result).toBe("UNKNOWN-ZONE");
  });

  it("should handle non-string input by converting to string", () => {
    const result = component._formatLocation(12345);
    expect(result).toBe("12345");
  });

  it("should format all zones as expected", () => {
    for (const [key, value] of Object.entries(zones)) {
      const result = component._formatLocation(key);
      if (value.shortName) {
        expect(result).toBe(value.shortName);
      } else if (value.zoneName) {
        expect(result).toBe(value.zoneName);
      } 
    }
  });
});