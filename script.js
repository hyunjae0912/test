let bookId = 1; // 책 번호

// 책 등록
function registerBook() {
    const category = document.getElementById('category').value.trim();
    const name = document.getElementById('bookname').value.trim();
    const price = document.getElementById('bookprice').value.trim();

    // 무결성 검사
    if (!category) {
        alert("카테고리를 선택해주세요.");
        return;
    }

    if (!name) {
        alert("도서명을 입력해주세요.");
        return;
    }

    if (!price) {
        alert("유효한 가격을 입력해주세요.");
        return;
    }
    // 테이블 가져옴
    const tbody = document.getElementById('book-list-tbody');
    const newRow = tbody.insertRow();

    // 같은 카테고리, 책 이름을 가진게 있나 검사
    for(let i = 0 ; i < tbody.rows.length; i++){
        // 처음은 건너뛰기
        if (tbody.rows[i].cells.length === 0) break;
        if(category === tbody.rows[i].cells[1].innerText
            && name === tbody.rows[i].cells[2].innerText){
                alert('같은 카테고리 안에 동일한 책이 중복되어 있습니다.');
                return;
        }
        //console.log('테스트');
    }

    // row에 들어갈 데이터 넣기
    newRow.insertCell(0).innerText = bookId++;
    newRow.insertCell(1).innerText = category;
    newRow.insertCell(2).innerText = name;
    newRow.insertCell(3).innerText = Number(price);

    // 삭제 버튼 추가
    const deleteCell = newRow.insertCell();
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "삭제";

    // 이벤트 리스너로 지우기 추가
    removeBtn.addEventListener("click", () => {
        // 몇 번째 줄에 위치하는지 인덱스 반환
        const rowIndexInTbody = newRow.sectionRowIndex;
        tbody.deleteRow(rowIndexInTbody);
    });
    

    deleteCell.appendChild(removeBtn);

    // 폼 초기화
    document.querySelector('form').reset();
}


function sortSelect(){
    const selectType = document.getElementById('sort-select').value;
    const tbody = document.getElementById('book-list-tbody');
    const arr = Array.from(tbody.rows);

    /*
    ascending
    [tr, tr]
    console.log(selectType);
    console.log(arr);
    */

    // 배열로 변환한걸 배열로 정렬함
    if(selectType === "ascending"){
        arr.sort((a,b)=>{
            console.log('테스트');
            return Number(a.cells[3].innerText) - Number(b.cells[3].innerText);
        });
    }

    else if(selectType === "descending"){
        arr.sort((a,b)=>{
            console.log('테스트');
            return Number(b.cells[3].innerText) - Number(a.cells[3].innerText);
        });
    }

    // 배열로 정렬된걸 html에 적용시킴
    arr.forEach((value) => tbody.appendChild(value));
}



function searchName(){
    // 일단 배열로 변환
    const tbody = document.getElementById('book-list-tbody');
    const arr = Array.from(tbody.rows);
    const keyWord = document.querySelector('#search-input');
    const regex = new RegExp(keyWord.value.trim());

    arr.filter((value) => {
        
        console.log(value.cells[2].innerText);
        return regex.test(value.cells[2].innerText);
    });

    // console.log(arr);
    // console.log(keyWord.value.trim(), typeof keyWord.value.trim());

    // 필터? include? 정규표현식?

    arr.forEach(row => {
        const bookName = row.cells[2].innerText;
        if (regex.test(bookName)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}