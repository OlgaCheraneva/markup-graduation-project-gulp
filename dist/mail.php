<?php

$method = $_SERVER['REQUEST_METHOD'];
$admin_email = 'cheraneva197@gmail.com';
$project_name = 'Markup Graduation Project';

if ( $method === 'POST' ) {
	$form_subject = trim($_POST["form_subject"]);

	foreach ( $_POST as $key => $value ) {
		if ( $value != "" && $key != "form_subject" ) {
			$message .= "
			<tr>
				<td style='padding: 10px; width: auto;'><b>$key:</b></td>
				<td style='padding: 10px; width: 100%;'>$value</td>
			</tr>
			";
		}
	}
}

$message = "<table style='width: 50%;'>$message</table>";

function adopt($text) {
	return '=?UTF-8?B?'.Base64_encode($text).'?=';
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
"Content-Type: text/html; charset=utf-8" . PHP_EOL .
'From: '.adopt($project_name).' <'.$admin_email.'>' . PHP_EOL .
'Reply-To: '.$admin_email.'' . PHP_EOL;

mail($admin_email, adopt($form_subject), $message, $headers );
