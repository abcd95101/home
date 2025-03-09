<?php
	header('Content-Type: application/json');
	
	$host = 'localhost';
	$dbuser ='root';
	$dbpassword = '';
	$dbname = 'test';
	$link = mysqli_connect($host,$dbuser,$dbpassword,$dbname);

	$gen = $_POST["gen"];
	$company = $_POST["company"];
	$vtuber_name = $_POST["vtuber_name"];
	$country = $_POST["select_country"];
	$birthday = $_POST["birthday"];
	$th = $_POST["th"];
	
	$sql = "INSERT INTO vtuber (gen, company, vtuber_name, country, birthday, th) VALUES ('$gen', '$company', '$vtuber_name', '$country', '$birthday', '$th')";
	mysqli_set_charset($link, "utf8mb4");

	mysqli_query($link, $sql);
	
	
	$data = array();
	$select_sql = "SELECT * FROM vtuber";
	$result = mysqli_query($link, $select_sql);
	
	if (mysqli_num_rows($result) > 0){
		while ($row = mysqli_fetch_row($result)){
			$data[] = array(
				"gen" => $row[0],
				"company" => $row[1],
				"vtuber_name" => $row[2],
				"country" => $row[3],
				"birthday" => $row[4],
				"th" => $row[5],
			);
		}
		echo json_encode($data, JSON_UNESCAPED_UNICODE);
	}

error_log(mysqli_error($link)); // 將錯誤記錄到伺服器日誌
mysqli_close($link);
?>
