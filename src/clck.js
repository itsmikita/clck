import * as bun from "bun";

/**
 * Shorten a URL using clck.ru
 * 
 * @param {string} url 
 * @returns {string}
 */
export const clck = async url => {
  console.log( `URL to be shortened: ${ url }` );
  const encoded = encodeURIComponent( url );
  console.log( `Encoded URL: ${ encoded }` );
  const request = new Request( `https://clck.ru/--?url=${ encoded }` );
  console.log( `Calling: ${ bun.inspect( request ) }...` );
  const response = await fetch( request );
  const shortened = await response.text();
  console.log( `Shortened URL: ${ shortened }` );
  return shortened;
};