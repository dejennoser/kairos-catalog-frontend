import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8180",
  realm: "kairos",
  clientId: "kairos-catalog",
});

export default keycloak;
