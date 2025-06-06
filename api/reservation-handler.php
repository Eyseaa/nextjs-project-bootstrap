<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// If it's a preflight request, return only the headers and exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    // Get JSON input
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Validate required fields
    $required_fields = ['name', 'email', 'phone', 'service', 'date', 'worker'];
    foreach ($required_fields as $field) {
        if (empty($data[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Validate email
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email format");
    }

    // Here you would typically:
    // 1. Sanitize inputs
    // 2. Save to database
    // 3. Send confirmation emails
    // For this example, we'll simulate success with a delay
    sleep(1);

    // Create response
    $response = [
        'success' => true,
        'message' => 'Reservation successfully created',
        'data' => [
            'reservation_id' => uniqid(),
            'name' => $data['name'],
            'date' => $data['date'],
            'service' => $data['service'],
            'worker' => $data['worker']
        ]
    ];

    http_response_code(200);
    echo json_encode($response);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
