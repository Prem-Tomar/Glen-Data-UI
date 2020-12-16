import { Component, OnInit, Renderer2 } from '@angular/core';
import { MainService } from '../../main.service';
import { EventResponseModel } from '../../src/models/EventResponseModel';
import { EventRequestModel } from '../../src/models/EventRequestModel';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  currentPage: number = 1;
  tableData: any[] = [];
  totalRecords: number;
  totalPages: number = 0;
  titleFilter: string = "";
  websiteFilter: string = "";
  venueFilter: string = "";

  constructor(private _service: MainService, private render: Renderer2) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(page: number = 1, batch: number = 10) {
    let body: EventRequestModel = { title: this.titleFilter, website: this.websiteFilter, venue: this.venueFilter }
    this._service.getAllEvents(body, page, batch).subscribe((res: EventResponseModel) => {

      this.tableData = res.body.data
      this.totalRecords = res.body.total;
      this.totalPages = Math.ceil(this.totalRecords / batch);

    }, err => {
      alert("Server returned error, kindly contact system administrator with given error message:" + err.error.message)
    })
  }

  getPages() {
    return Array(this.totalPages).fill(0).map((x, i) => i)
  }

  changePage(page, event) {
    this.currentPage = page + 1;
    this.getEvents(page + 1);
    this.render.addClass(event.target, "active");
  }

  next() {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.getEvents(this.currentPage);
    }
  }
  prev() {

    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.getEvents(this.currentPage);
    }

  }

  filter() {
    this.currentPage = 1;
    this.getEvents(this.currentPage);
  }

  sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
}
