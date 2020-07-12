import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { DashboardServiceService } from './services/dashboard-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'eCourseManagement';
  isSubmitted = false;

  // Aeronautical Engineering, Mechanical Engineering, Civil Engineering, Computer Science Engineering, 
  // Chemical Engineering, Electronics & Communication Engineering , Marine Engineering ,
  //  Biotech Engineering, Engineering Physics , 
  // Textile Engineering
  dataObject = [
    {
      Graduation: 'UG',
      Specialization: [
        {
          'name': 'BTech',
          'department':[
            {
              'name':'Information Technology',
              'year': [
                {
                  'number': '1st Year'
                },
                {
                  'number': '2st Year'
                },
                {
                  'number': '3st Year'
                },
                {
                  'number': '4st Year'
                }
              ]
            },
            {
              'name':'Computer Science Engineering',
              'year': [
                {
                  'number': '1st Year'
                },
                {
                  'number': '2st Year'
                },
                {
                  'number': '3st Year'
                },
                {
                  'number': '4st Year'
                }
              ]
            },
            {
              'name':'Mechanical Engineering',
              'year': [
                {
                  'number': '1st Year'
                },
                {
                  'number': '2st Year'
                },
                {
                  'number': '3st Year'
                },
                {
                  'number': '4st Year'
                }
              ]
            }
          ],
            
        },
        {
          'name': 'BCom',
          'year': [
            {
              'number': '1st Year'
            },
            {
              'number': '2st Year'
            },
            {
              'number': '3st Year'
            }
          ]
        },
        {
          'name': 'BSc',
          'year': [
            {
              'number': '1st Year'
            },
            {
              'number': '2st Year'
            },
            {
              'number': '3st Year'
            }
          ]
        }
      ]
    },
    {
      Graduation: 'PG',
      Specialization: [
        {
          'name': 'MTech',
          'year': [
            {
              'number': '1st Year'
            },
            {
              'number': '2st Year'
            }
          ]
        },
        {
          'name': 'Phd',
          'year': [
            {
              'number': '1st Year'
            },
            {
              'number': '2st Year'
            },
            {
              'number': '3st Year'
            },
            {
              'number': '4st Year'
            }
          ]
        },
        {
          'name': 'MCom',
          'year': [
            {
              'number': '1st Year'
            },
            {
              'number': '2st Year'
            }
          ]
        }
      ]
    }

  ]
  constructor(public fb: FormBuilder, private dashboardService: DashboardServiceService) { }
  public showCourse: Boolean = false;
  public bodyObj: any;
  public resultObj: any;
  public specilizationObject: any;
  public departmentObject : any;
  public yearObject : any;
  public searchText: any;
  public noRecords : boolean = false;
  ngOnInit() {
   this.loadCourse()
    console.log("check1::",this.registrationForm.get('GraduationName').value); 
  }

  loadCourse(){
    this.bodyObj = {
      "state": "catalog",
        "graduationName" : this.registrationForm.get('GraduationName').value,
      "specilization" : this.registrationForm.get('SpecializationName').value,
      "year" : this.registrationForm.get('Year').value
    }
    console.log("this.bodyObj:::",this.bodyObj);
    this.dashboardService.getCourseDetails(this.bodyObj).subscribe(data => {
      if (data) {
        console.log("data:::", data);
        this.resultObj = data;

        if(this.resultObj.length == 0){
          this.noRecords = true;
        }
      } else {
        alert("Error while saving config");
      }
    });
  }

  /*########### Form ###########*/
  registrationForm = this.fb.group({
    GraduationName: ['', [Validators.required]],
    SpecializationName: ['', [Validators.required]],
    Year: ['', [Validators.required]],
    DepartmentName:['',[Validators.required]]
  })


  // Choose city using select dropdown
  changeGraduation(e) {
    console.log("selected graduation")
    console.log(e);
    console.log("e.target.value:::",e.target.value);
    this.GraduationName.setValue(e.target.value);
    alert(JSON.stringify(this.registrationForm.value));
    this.specilizationObject = this.dataObject.find(con => con.Graduation == e.target.value).Specialization;
    console.log("spec:::",this.specilizationObject);
  }

  changeSpecilization(e : any) {
    console.log(e.target.value);
    this.SpecializationName.setValue(e.target.value);
    this.departmentObject = this.specilizationObject.find(con => con.name == e.target.value).department;
  }

  changeDepartment(e : any){
    console.log(e.target.value);
    this.DepartmentName.setValue(e.target.value);
    this.yearObject = this.departmentObject.find(con => con.name == e.target.value).year;
    console.log("spec:::",this.yearObject);
  }

  changeYear(e : any) {
    console.log(e.target.value);
    this.Year.setValue(e.target.value);
  }
  
  // Getter method to access formcontrols
  get GraduationName() {
    return this.registrationForm.get('GraduationName');
  }
  get SpecializationName() {
    return this.registrationForm.get('SpecializationName');
  }

  get DepartmentName() {
    return this.registrationForm.get('DepartmentName');
  }

  get Year() {
    return this.registrationForm.get('Year');
  }
  /*########### Template Driven Form ###########*/
  onSubmit() {
    this.isSubmitted = true;
    alert(JSON.stringify(this.registrationForm.value));
      this.bodyObj = {
        "state": "catalog",
        "graduationName" : this.registrationForm.get('GraduationName').value,
        "specilization" : this.registrationForm.get('SpecializationName').value,
        "year" : this.registrationForm.get('Year').value
      }
      console.log("this.bodyObj:::",this.bodyObj);
      this.dashboardService.getCourseDetails(this.bodyObj).subscribe(data => {
        if (data) {
          console.log("data:::", data);
          this.resultObj = data;
        } else {
          alert("Error while saving config");
        }
      });
  }

}
