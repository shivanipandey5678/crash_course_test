 let fetch_all_data=[];
 let tbody=document.querySelector("tbody")
 let Next_btn=document.getElementById("Next");
 let Previous_btn=document.getElementById("Previous");
 let gender=document.getElementById("gender");
 let Salary=document.getElementById("Salary");
 let Select_Departmen=document.getElementById("Select_Departmen");
 let changed_gender;
 let changed_Department;
//  let page=1;
 
 
 function fetching(URL){
   fetch(URL)
   .then(function(res){
    let response=res.json()
    return response;
   })
   .then(function(response){
    let inner_data=response.data;
    inner_data.forEach(function(e){
        fetch_all_data.push(e)
       
    })
    show_data(inner_data)
    console.log(fetch_all_data)
   })
   .catch(function(err){
    console.log(err)
   })
}


function show_data(arr){
    tbody.innerHTML=""
  arr.forEach(function(e,index){
    let tr=document.createElement("tr");
    let td1=document.createElement("td");
    td1.innerText=`${index+1}`;
    let td2=document.createElement("td");
     td2.innerText=e.name;
     let td3=document.createElement("td");
     td3.innerText=e.gender;
     let td4=document.createElement("td");
     td4.innerText=e.department;
     let td5=document.createElement("td");
     td5.innerText=e.salary;
     tr.append(td1,td2,td3,td4,td5)
     tbody.append(tr)
  })
 


}

function Next_10data(){
    URL=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=10`;
    ++page;
    fetching(URL)

}
function Previous_10data(){
    URL=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=10`;
    if(page>1){
        --page;
    }else{
        Previous_btn.style.disable=true;
    }
  
    fetching(URL)
}

function sort_gender(){
    changed_gender=gender.value;
    let nar=fetch_all_data.filter(function(e){
        return e.gender==changed_gender;
    })
    show_data(nar)
    // URL=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=20&filterBy=gender&filterValue=${changed_gender}`
    // fetching(URL)
}

function sort_Select_Departmen(){
    changed_Department=Select_Departmen.value;

    let nar=fetch_all_data.filter(function(e){
        return e.department==changed_Department;
    })
    show_data(nar)
    // URL=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=20&filterBy=department&filterValue=${changed_Department}`
    // fetching(URL)
}
function sort_Select_Departmen_and_gender(){
    changed_Department=Select_Departmen.value;
    changed_gender=gender.value;

    URL=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=20&filterBy=department&filterValue=${changed_Department}&filterBy=gender&filterValue=${changed_gender}`
    fetching(URL)
}




function Salary_sort(){
    let sort_salary=Salary.value;
    console.log(sort_salary)
       if(sort_salary=="asc"){
        let Asc_salary=fetch_all_data.sort(function(a,b){
            return a.salary-b.salary;
        });
        show_data(Asc_salary)
}

 
 if(sort_salary=="des"){
    let Des_salary=fetch_all_data.sort(function(a,b){
        return b.salary-a.salary;
    });
    show_data(Des_salary)
}
}







Next_btn.addEventListener("click",Next_10data);
Previous_btn.addEventListener("click",Previous_10data);
gender.addEventListener("change",sort_gender);
Select_Departmen.addEventListener("change",sort_Select_Departmen);
Salary.addEventListener("change",Salary_sort)
Select_Departmen&&gender.addEventListener("change",sort_Select_Departmen_and_gender)


// URL=`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=20&filterBy=department&filterValue=${changed_Department}&filterBy=gender&filterValue=${changed_gender}`


















fetching('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees');