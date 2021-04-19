import { Auth } from "shopify-admin-api";

const urlFromUser = "https://example.myshopify.com";
const isValidUrl = await Auth.isValidMyShopifyDomain(urlFromUser

const redirectUrl = "https://example.com/my/redirect/url";

const code = request.QueryString["code"];
const shopUrl = request.QueryString["shop"];

const qs = request.QueryString;
const isAuthentic = await Auth.isAuthenticRequest(qs, shopifySecretKey);

if (isAuthentic) {

    //Request is authentic.
} else {

    //Request is not authentic and should not be acted on.

}



const accessToken = await Auth.authorize(code, shopUrl, shopifyApiKey, shopifySecretKey)
