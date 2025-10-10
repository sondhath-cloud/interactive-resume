<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration
$host = 'localhost';
$dbname = 'sondraha_application-helper';
$username = 'sondraha_application-helper';
$password = 'bDqNdZ7xEqeBP2ub2tPy';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['experience_data'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid data received']);
        exit;
    }
    
    $experienceData = $input['experience_data'];
    $userId = $input['user_id'] ?? 'sondra_hathaway';
    $saveDate = $input['save_date'] ?? date('Y-m-d');
    
    try {
        // Create table if it doesn't exist
        $createTableSQL = "
            CREATE TABLE IF NOT EXISTS professional_experience (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id VARCHAR(100) NOT NULL,
                employer VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
                dates VARCHAR(100) NOT NULL,
                description TEXT NOT NULL,
                saved_date DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_user_id (user_id),
                INDEX idx_employer (employer),
                INDEX idx_saved_date (saved_date)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        ";
        
        $pdo->exec($createTableSQL);
        
        // Clear existing data for this user and save date (optional - remove if you want to keep all versions)
        $deleteSQL = "DELETE FROM professional_experience WHERE user_id = ? AND saved_date = ?";
        $deleteStmt = $pdo->prepare($deleteSQL);
        $deleteStmt->execute([$userId, $saveDate]);
        
        // Insert new experience data
        $insertSQL = "
            INSERT INTO professional_experience 
            (user_id, employer, title, dates, description, saved_date, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ";
        
        $insertStmt = $pdo->prepare($insertSQL);
        $recordsSaved = 0;
        
        foreach ($experienceData as $experience) {
            $insertStmt->execute([
                $userId,
                $experience['employer'],
                $experience['title'],
                $experience['dates'],
                $experience['description'],
                $saveDate,
                $experience['created_at']
            ]);
            $recordsSaved++;
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Experience data saved successfully',
            'records_saved' => $recordsSaved,
            'user_id' => $userId,
            'save_date' => $saveDate
        ]);
        
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
    
} else {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>
