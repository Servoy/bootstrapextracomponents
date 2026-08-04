import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule, IValuelist } from '@servoy/public';
import { ServoyBootstrapExtraButtonsGroup } from './buttonsgroup';
import { of } from 'rxjs';

function createMockValuelist(): IValuelist {
    const mockData = [{
        displayValue: 'one',
        realValue: 1
    }, {
        displayValue: 'two',
        realValue: 2
    }, {
        displayValue: 'three',
        realValue: 3
    }, {
        displayValue: 'four',
        realValue: 4
    }] as IValuelist;
    mockData.hasRealValues = () => true;
    mockData.isRealValueDate = () => false;
    mockData.getDisplayValue = (value) => {
        const item = mockData.filter(i => i.realValue === value)[0];
        return of(item?.displayValue);
    };
    return mockData;
}

describe('ServoyBootstrapExtraButtonsGroup', () => {
    let fixture: ComponentFixture<ServoyBootstrapExtraButtonsGroup>;
    let component: ServoyBootstrapExtraButtonsGroup;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServoyBootstrapExtraButtonsGroup],
            imports: [ServoyPublicTestingModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ServoyBootstrapExtraButtonsGroup);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        fixture.componentRef.setInput('enabled', true);
        fixture.componentRef.setInput('showAs', 'text');
        fixture.componentRef.setInput('inputType', 'RADIO');
        fixture.componentRef.setInput('valuelistID', createMockValuelist());
        fixture.componentRef.setInput('dataProviderID', 1);

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should mark the selected item as active', async () => {
        const buttons = fixture.nativeElement.querySelectorAll('button');
        expect(buttons[0].classList.contains('active')).toBe(true);
    });

    it('should disable buttons when enabled is false', async () => {
        fixture.componentRef.setInput('enabled', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const button = fixture.nativeElement.querySelector('button');
        expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('should apply style class', async () => {
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        const button = fixture.nativeElement.querySelector('button');
        expect(button.classList.contains('mystyleclass')).toBe(true);
    });

    it('should apply multiple style classes', async () => {
        fixture.componentRef.setInput('styleClass', 'classA classB');
        fixture.detectChanges();
        await fixture.whenStable();
        const button = fixture.nativeElement.querySelector('button');
        expect(button.classList.contains('classA')).toBe(true);
        expect(button.classList.contains('classB')).toBe(true);
    });

    it('should emit dataProviderIDChange on button click', async () => {
        const changeSpy = vi.fn();
        component.dataProviderIDChange.subscribe(changeSpy);
        const buttons = fixture.nativeElement.querySelectorAll('button');
        buttons[1].click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(changeSpy).toHaveBeenCalledWith(2);
    });
});
