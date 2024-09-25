import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonDePagosComponent } from './boton-de-pagos.component';

describe('BotonDePagosComponent', () => {
  let component: BotonDePagosComponent;
  let fixture: ComponentFixture<BotonDePagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonDePagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonDePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
