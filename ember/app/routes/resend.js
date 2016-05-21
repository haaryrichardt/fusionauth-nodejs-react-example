/*
 * Copyright (c) 2016, Inversoft Inc., All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 */

import Ember from "ember";
import errorHandler from "../lib/errors";

export default Ember.Route.extend({
  actions: {
    resend() {
      var self = this;
      var verifyRequest = {
        email: this.controller.get("email")
      };
      Ember.$.post("/api/verify", verifyRequest)
        .done(() => {
          self.controller.set("errors", {"general": "Email resent"});
        })
        .fail((err) => {
          var errors = {"email": "Email not found"};
          if (err.responseText) {
            errors = errorHandler.handleErrors(JSON.parse(err.responseText));
          }
          self.controller.set("errors", errors);
        });
    }
  }
});