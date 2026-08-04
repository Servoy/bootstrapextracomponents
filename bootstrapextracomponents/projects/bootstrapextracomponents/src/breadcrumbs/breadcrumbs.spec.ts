import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapExtraBreadcrumbs } from './breadcrumbs';

describe('ServoyBootstrapExtraBreadcrumbs', () => {
    let fixture: ComponentFixture<ServoyBootstrapExtraBreadcrumbs>;
    let component: ServoyBootstrapExtraBreadcrumbs;

    const defaultBreadcrumbs = [
        { crumbId: 'Home', displayName: 'Home' },
        { crumbId: 'Library', displayName: 'Library' },
        { crumbId: 'Data', displayName: 'Data' }
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServoyBootstrapExtraBreadcrumbs],
            imports: [ServoyPublicTestingModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ServoyBootstrapExtraBreadcrumbs);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        fixture.componentRef.setInput('breadcrumbs', defaultBreadcrumbs);

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should render breadcrumb items', async () => {
        const items = fixture.nativeElement.querySelectorAll('li');
        expect(items.length).toBe(3);
        expect(items[2].textContent).toContain('Data');
    });

    it('should apply style class', async () => {
        fixture.componentRef.setInput('styleClass', 'mystyleclass');
        fixture.detectChanges();
        await fixture.whenStable();
        const ol = fixture.nativeElement.querySelector('ol');
        expect(ol.classList.contains('mystyleclass')).toBe(true);
    });

    it('should apply multiple style classes', async () => {
        fixture.componentRef.setInput('styleClass', 'classA classB');
        fixture.detectChanges();
        await fixture.whenStable();
        const ol = fixture.nativeElement.querySelector('ol');
        expect(ol.classList.contains('classA')).toBe(true);
        expect(ol.classList.contains('classB')).toBe(true);
    });

    it('should apply crumbStyleClass and lastCrumbStyleClass', async () => {
        fixture.componentRef.setInput('crumbStyleClass', 'crumbStyleClass');
        fixture.componentRef.setInput('lastCrumbStyleClass', 'lastCrumbStyleClass');
        fixture.detectChanges();
        await fixture.whenStable();
        const items = fixture.nativeElement.querySelectorAll('li');
        expect(items[0].classList.contains('crumbStyleClass')).toBe(true);
        expect(items[1].classList.contains('crumbStyleClass')).toBe(true);
        expect(items[2].classList.contains('lastCrumbStyleClass')).toBe(true);
    });

    it('should handle crumbClicked event', async () => {
        const onCrumbClicked = vi.fn();
        fixture.componentRef.setInput('onCrumbClicked', onCrumbClicked);
        fixture.detectChanges();
        await fixture.whenStable();
        const firstCrumb = fixture.nativeElement.querySelector('li a');
        firstCrumb.click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(onCrumbClicked).toHaveBeenCalled();
    });

    it('should remove trailing breadcrumbs when autoRemoveWhenClicked is true', async () => {
        fixture.componentRef.setInput('autoRemoveWhenClicked', true);
        fixture.detectChanges();
        await fixture.whenStable();
        const firstCrumb = fixture.nativeElement.querySelector('li a');
        firstCrumb.click();
        fixture.detectChanges();
        await fixture.whenStable();
        const items = fixture.nativeElement.querySelectorAll('li');
        expect(items.length).toBe(1);
    });
});
