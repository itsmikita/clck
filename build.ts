/**
 * @module clck
 * @file build.ts
 * @description Shorten URLs from the command line using the clck.ru service.
 * @version 0.0.5
 * @author Mikita Stankiewicz <itsmikita@gmail.com>
 */
import { 
  existsSync, 
  unlinkSync, 
  copyFileSync, 
  chmodSync, 
  symlinkSync 
} from "node:fs";

/**
 * @function build
 * @param {string} target - The target source: 'sh' (clck.sh) or 'js' ( clck.js ).
 * @description Builds the clck.sh binary.
 * @returns {void}
 */
export const build = ( target: string ): void => {
  console.log( "Building...", process );
  if( existsSync( `bun ${ process.cwd() }/bin/clck.sh` ) ) {
    console.log( `Removing old build... (${ process.cwd() }/bin/clck.sh)` );
    unlinkSync( `${ process.cwd() }/bin/clck.sh` );
  }
  if( existsSync( "/usr/local/bin/clck" ) ) {
    console.log( "Unlinking binaries... (/usr/local/bin/clck)" );
    unlinkSync( "/usr/local/bin/clck" );
  }
  console.log( `Copying new build... (${ process.cwd() }/src/clck.sh -> ${ process.cwd() }/bin/clck.sh)` );
  copyFileSync( `${ process.cwd() }/src/clck.sh`, `${ process.cwd() }/bin/clck.sh` );
  try {
    console.log( `Setting permissions... (chmod 0755 ${ process.cwd() }/bin/clck.sh)` );
    chmodSync( `${ process.cwd() }/bin/clck.sh`, "0755" );
  } catch ( error ) {
    console.error( error );
    process.exit( 1 );
  }
  console.log( `Linking the new binaries... (/usr/local/bin/clck -> ${ process.cwd() }/bin/clck.sh)` );
  symlinkSync( "/usr/local/bin/clck", `${ process.cwd() }/bin/clck.sh` );
};

// Execute the build function.
build( "js" );