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
		select.add(newOption);

		// 儲存到Local Storage
		saveOptions();
		alert(`已成功新增選項-- "${inputText}"`);
	} else {
		alert("請輸入選項文字");
	}

  // 清空輸入框
  document.getElementById("add_country").value = "";
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