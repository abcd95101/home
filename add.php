<?php

	header('Content-Type: application/json');
	
	$host = 'localhost';
	$dbuser ='root';
	$dbpassword = '';
	$dbname = 'test';
	$link = mysqli_connect($host,$dbuser,$dbpassword,$dbname);
	
	$compony = $_POST['compony'];
	$vtuber_name = $_POST['vtuber_name'];
	$country = $_POST['select_country'];
	$birthday = $_POST['birthday'];
	$th = $_POST['th'];
	
	$sql = "INSERT INTO vtuber (compony, vtuber_name, country, birthday, th) VALUES ('$compony', '$vtuber_name', '$country', '$birthday', '$th')";
	mysqli_set_charset($link, "utf8mb4");

	mysqli_query($link,$sql);
	
	
	$data = array();
	$select_sql = "SELECT * FROM `vtuber`";
	$result = mysqli_query($link,$select_sql);
	
	if (mysqli_num_rows($result) > 0){
		while ($row = mysqli_fetch_row($result)){
			$data[] = array(
				'success' => true,
				'compony' => $row[0],
				'vtuber_name' => $row[1],
				'country' => $row[2],
				'birthday' => $row[3],
				'th' => $row[4],
			);
		}
		echo json_encode($data,JSON_UNESCAPED_UNICODE);
	} else {
    // 插入失敗，返回錯誤訊息
    echo json_encode([
        'success' => false,
        'message' => '插入資料失敗！' . mysqli_error($link)
    ], JSON_UNESCAPED_UNICODE);
	}

error_log(mysqli_error($link)); // 將錯誤記錄到伺服器日誌
mysqli_close($link);



?>