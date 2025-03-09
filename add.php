<?php
header('Content-Type: application/json');

// 資料庫連線
$host = 'localhost';
$dbuser = 'root';
$dbpassword = '';
$dbname = 'test';
$link = mysqli_connect($host, $dbuser, $dbpassword, $dbname);

if (!$link) {
    echo json_encode(['success' => false, 'message' => '資料庫連線失敗']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		// 接收 POST 資料
		$gen = $_POST['gen'];
		$company = $_POST['company'];
		$vtuber_name = $_POST['vtuber_name'];
		$country = $_POST['select_country'];
		$birthday = $_POST['birthday'];
		$th = $_POST['th'];

		// 插入資料
		$sql = $link->query("INSERT INTO vtuber (gen, company, vtuber_name, country, birthday, th) VALUES ('$gen', '$company', '$vtuber_name', '$country', '$birthday', '$th')");
		mysqli_set_charset($link, "utf8mb4");

		mysqli_query($link, $sql);
		$data = array(
			"gen" => $gen,
			"company" => $company,
			"vtuber_name" => $vtuber_name,
			"country" => $country, 
			"birthday" => $birthday, 
			"th" => $th
		);
		echo json_encode($data, JSON_UNESCAPED_UNICODE);
	
	} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // 返回資料
    $result = $link->query("SELECT * FROM vtuber");
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
}

mysqli_close($link);
?>
