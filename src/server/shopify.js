import Koa from 'koa'
import { verifyRequest } from '@shopify/koa-shopify-auth'
import { default: Shopify, ApiVersion } from '@shopify/shopify-api'
import { default: createShopifyAuth } from '@shopify/koa-shopify-auth'

Shopify.Context.initialize({
	API_KEY: process.env.SHOPIFY_API_KEY,
	API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
	SCOPES: process.env.SHOPIFY_API_SCOPES.split(","),
	HOST_NAME: process.env.SHOPIFY_APP_URL.replace(/https:\/\//, ""),
	API_VERSION: ApiVersion.October20,
	IS_EMBEDDED_APP: true,
	SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
	})


