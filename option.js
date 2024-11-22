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
		} else {
			alert("此選項無出現在選單裡，或是預設選項");
		}
	// 清空刪除輸入框
	document.getElementById("add_country").value = "";
}

function add(FormId) {
    const form = document.getElementById(FormId);
	
	if (!form) {
        console.error(`Form with ID '' not found.`);
        return;
    }
	
    form.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const formData = new FormData(form);

		for (let [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}
		
		console.log("Form data:", formData);

        fetch('add.php' , {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (true) {
                alert('成功');
				console.log(data);
				const table = document.getElementById('dataTable');
				const tbody = table.querySelector('tbody');
				const row = tbody.insertRow();
				row.innerHTML = `
					<td>${data.gen}</td>
	                <td>${data.company}</td>
	                <td>${data.vtuber_name}</td>
	                <td>${data.country}</td>
	                <td>${data.birthday}</td>
	                <td>${data.th}</td>
	                `;
				
            } else {
                alert('失敗' + data.message);
            }
        })
        .catch(error => console.error('Error:', error));
		form.reset();
    });
}

function loadData() {
    fetch('add.php', {
        method: 'GET'
    })
    .then(response => response.json()) 
    .then(data => {
            const table = document.getElementById('dataTable');
            const tbody = table.querySelector('tbody');
		
        if (true) {
             for ( let x = 0; x < data.length; x++ ) {
			   const row = tbody.insertRow(); // 在表格最後新增一列
			   row.innerHTML = `
					<td>${data[x].gen}</td>
	                <td>${data[x].company}</td>
	                <td>${data[x].vtuber_name}</td>
	                <td>${data[x].country}</td>
	                <td>${data[x].birthday}</td>
	                <td>${data[x].th}</td>
	                `
			;
			 };
        } else {
            alert('載入失敗：' + data.message);
		}
    }).catch(error => {
		console.error('Error:', error);
		console.log(data[0]);
	});
}

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    add('insertdata'); // 確保在載入頁面後，綁定 add 函數
});