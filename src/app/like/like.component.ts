import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

enum ValueType {
  Like = 'like',
  Dislike = 'dislike',
  Untouched = 'none'
};

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LikeComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LikeComponent),
      multi: true
    }
  ]
})
export class LikeComponent implements OnInit, ControlValueAccessor {
  active: any = ValueType.Untouched;
  onChange = (_: any) => {};

  constructor() { }

  writeValue(obj: any): void {
   this.active =  obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;  
  }
  registerOnTouched(fn: any): void {
  }

  ngOnInit(): void {
  }

  like(){
    if(this.active === ValueType.Untouched){
      this.active = ValueType.Like;
    }else if (this.active === ValueType.Like){
      this.active = ValueType.Dislike;
    }else {
      this.active = ValueType.Like;
    }
    this.onChange(this.active);
  }

  validate(){
    if(this.active === null){
      return {required: true};
    }
    return null;
  }

}
