"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrowser = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const getBrowser = async () => {
    const browser = await puppeteer_1.default.launch({
        headless: false,
        args: ['--no-sandbox'],
    });
    return browser;
};
exports.getBrowser = getBrowser;
