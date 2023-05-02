import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskArr: Task[] = [];
  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) { }
  ngOnInit() {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTasks();
  }
  getAllTasks() {
    this.crudService.getAllTasks().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("Unable to get the list of Tasks");
    })
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTasks(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, err => {
      alert(err);
    })
  }

  editTasks() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTasks(this.taskObj).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Failed to Update tasks");
    })
  }

  deleteTasks(etask: Task) {
    this.crudService.deleteTasks(etask).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Unable to Remove the Tasks");
    })
  }

  call(etask:Task){
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
