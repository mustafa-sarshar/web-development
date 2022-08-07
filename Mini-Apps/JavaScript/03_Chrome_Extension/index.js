let lst_saved_items = [];

const lst_saved_items_localStorage = JSON.parse(window.localStorage.getItem("saved_items"));
const btn_save_input = document.getElementById("btn-save-input");
const btn_delete_all = document.getElementById("btn-delete-all");
const btn_save_tab = document.getElementById("btn-save-tab");
const txt_input = document.getElementById("txt-input");
const lst_saved_items_output = document.getElementById("lst-saved-items-output");

btn_save_input.addEventListener("click", save_input_clicked);
btn_save_tab.addEventListener("click", save_tab_clicked);
btn_delete_all.addEventListener("dblclick", delete_all_items);

function init_saved_items() {
    if (lst_saved_items_localStorage) {
        lst_saved_items = lst_saved_items_localStorage;
        render_item_list(lst_saved_items);
    };
};

function save_tab_clicked() {
    // Different methods
    /* let activeTabURL = window.location.toString();
    OR
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let activeTabURL = tabs[0].url;
        ...
    });
    OR -> */
    chrome.tabs.query(
        {active: true, currentWindow: true},
        function (tabs) {
            let activeTabURL = tabs[0].url;      
            let idx = search_item_in_list(lst_saved_items, activeTabURL);
            if (idx === null) {      
                lst_saved_items.push(activeTabURL);
                update_localStorage(false);
                render_item_list(lst_saved_items);
            };
        },
    );
};

function save_input_clicked() {
    let input_value = txt_input.value;
    if (input_value) {
        let idx = search_item_in_list(lst_saved_items, input_value);
        if (idx === null) {
            lst_saved_items.push(txt_input.value);            
            update_localStorage(false);
            render_item_list(lst_saved_items);
        };
    };
};

function render_item_list(lst_items) {    
    lst_saved_items_output.innerHTML = "";
    for (let i=0; i<lst_items.length; i++) {
        lst_saved_items_output.innerHTML += `
            <li>
                <a target="_blank" href="${lst_items[i]}" >
                    ${lst_items[i]}
                </a>
                <button class="BTN-DEL" onclick="del_item(${i})">DEL</button>
            </li>
        `;     
    };    
    txt_input.value = "";
};

function delete_all_items () {
    lst_saved_items = [];
    update_localStorage(true);
    render_item_list(lst_saved_items);
};

function del_item(idx_item) {
    lst_saved_items.splice(idx_item, 1);
    update_localStorage(true);
    render_item_list(lst_saved_items);
};

function search_item_in_list(lst_target, item_to_search) {
    for (let i=0; i<lst_target.length; i++) {        
        if (lst_target[i] == item_to_search) {
            return i;
        };
    };
    return null;
};

function update_localStorage(reset=false) {
    if (reset) { window.localStorage.clear(); };
    window.localStorage.setItem(
        "saved_items",
        JSON.stringify(lst_saved_items),
    );
};

init_saved_items();