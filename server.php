<?php
// Simple PHP development server for handling API requests
$port = 8000;
$host = 'localhost';

// Set the document root to the current directory
$root = __DIR__;

echo "Starting PHP server at http://{$host}:{$port}\n";
echo "Document root: {$root}\n";
echo "Press Ctrl+C to stop the server\n";

// Start the built-in PHP development server
$command = sprintf('php -S %s:%d -t %s', $host, $port, $root);
system($command);
?>
