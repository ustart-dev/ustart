/**
 * Configuration file for jest
*/
require("dotenv").config();

import TestingUtils from "../__tests__/utils";

global.TestingUtils = new TestingUtils();
