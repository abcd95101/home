// 初始化：從Local Storage載入選項
window.onload = function() {
  loadOptions();
};

function loadOptions() {
	const select = document.getElementById("select_country");
	const storedOptions = JSON.parse(localStorage.getItem("dropdownOptions")) || [];

	 // 清空下拉選單，僅保留預設選項
	const defaultOptions = Array.from(select.querySelectorAll(".default"));
	select.innerHTML = ""; // 清空全部
	defaultOptions.forEach(option => select.add(option)); // 添加回預設選項

	// 動態新增選項
	storedOptions.forEach(optionText => {
		const newOption = document.createElement("option");
		newOption.text = optionText;
		select.add(newOption);
	});
}

function saveOptions() {
	const select = document.getElementById("select_country");
	const options = [];

	// 取得非預設選項的值
	for (let i = 0; i < select.options.length; i++) {
		if (!select.options[i].classList.contains("default")) {
		options.push(select.options[i].text);
		}
	}

	// 儲存到Local Storage
	localStorage.setItem("dropdownOptions", JSON.stringify(options));
}

function addCustomOption() {
	const select = document.getElementById("select_country");
	const inputText = document.getElementById("add_country").value.trim();

	if (inputText !== "") {
		// 新增選項到下拉選單
		const newOption = document.createElement("option");
		newOption.text = inputText;
		newOption.value = inputText;
		select.add(newOption);

		// 儲存到Local Storage
		saveOptions();
		alert(`已成功新增選項-- "${inputText}"`);
	} else {
		alert("請輸入選項文字");
	}
}

function deleteSelectedOption() {
	const select = document.getElementById("select_country");
	const deleteText = document.getElementById("add_country").value.trim();
	let optionFound = false;

	for (let i = 0; i < select.options.length; i++) {
    const option = select.options[i];

	if (option.text === deleteText && !option.classList.contains("default")) {
      select.remove(i);
      optionFound = true;
      break;
    }
  }
	
	if (optionFound) {
		saveOptions();
		alert(`已成功刪除-- "${deleteText}"`);
	}
	else {
		alert("此選項無出現在選單裡，或是預設選項");
	}

	// 清空刪除輸入框
	document.getElementById("add_country").value = "";
}

function add1() {
    const form = document.getElementById(formId);
    
    if (!form) {
        console.error(`Form with ID '${formId}' not found.`);
        return;
    }

    form.addEventListener('submit', function(e) {
	    e.preventDefault(); // 阻止表單默認提交行為，避免頁面刷新

	    const formData = new FormData(this); // 獲取表單資料

	    fetch('add.php', {
		    method: 'POST',
		    body: formData 
		}) 
	})
}

function add(formId, url) {
    const form = document.getElementById(formId);
    
    if (!form) {
        console.error(`Form with ID '${formId}' not found.`);
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // 防止表單提交刷新頁面

        const formData = new FormData(form);

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
			console.log(data[0]);
            if (true) {
                // 將新增的資料動態插入表格
                const table = document.getElementById('dataTable'); // 確認你的表格 ID
                const tbody = table.querySelector('tbody');
                const row = tbody.insertRow(); // 在表格最後新增一列

            } else {
                alert('新增失敗：' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
		form.reset();  //輸入後，淨空form欄位
    });
}

add('insertdata', 'add.php');  // 固定表單