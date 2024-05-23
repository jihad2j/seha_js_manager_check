"use strict";

// Selecting the sidebar and buttons
var sidebar = document.querySelector(".sidebar");
var sidebarOpenBtn = document.querySelector("#sidebar-open");
var sidebarCloseBtn = document.querySelector("#sidebar-close");
var sidebarLockBtn = document.querySelector("#lock-icon"); // Function to toggle the lock state of the sidebar

var toggleLock = function toggleLock() {
  sidebar.classList.toggle("locked"); // If the sidebar is not locked

  if (!sidebar.classList.contains("locked")) {
    sidebar.classList.add("hoverable");
    sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
  } else {
    sidebar.classList.remove("hoverable");
    sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
  }
}; // Function to hide the sidebar when the mouse leaves


var hideSidebar = function hideSidebar() {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
}; // Function to show the sidebar when the mouse enter


var showSidebar = function showSidebar() {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
}; // Function to show and hide the sidebar


var toggleSidebar = function toggleSidebar() {
  sidebar.classList.toggle("close");
}; // If the window width is less than 800px, close the sidebar and remove hoverability and lock


if (window.innerWidth < 800) {
  sidebar.classList.add("close");
  sidebar.classList.remove("locked");
  sidebar.classList.remove("hoverable");
} // Adding event listeners to buttons and sidebar for the corresponding actions


sidebarLockBtn.addEventListener("click", toggleLock);
sidebar.addEventListener("mouseleave", hideSidebar);
sidebar.addEventListener("mouseenter", showSidebar);
sidebarOpenBtn.addEventListener("click", toggleSidebar);
sidebarCloseBtn.addEventListener("click", toggleSidebar);
//# sourceMappingURL=sidebar.dev.js.map
