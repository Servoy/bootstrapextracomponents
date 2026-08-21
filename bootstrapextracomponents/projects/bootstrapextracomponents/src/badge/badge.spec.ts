import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { ServoyBootstrapExtraBadge } from './badge';

describe('ServoyBootstrapExtraBadge', () => {
    let fixture: ComponentFixture<ServoyBootstrapExtraBadge>;
    let component: ServoyBootstrapExtraBadge;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ServoyBootstrapExtraBadge, ServoyPublicTestingModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ServoyBootstrapExtraBadge);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        fixture.componentRef.setInput('enabled', true);
        fixture.componentRef.setInput('text', 'text');
        fixture.componentRef.setInput('badgeText', 'badgeText');
        fixture.componentRef.setInput('displayType', 'BUTTON');

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should return a valid native element from getNativeElement()', () => {
        expect(component.getNativeElement()).not.toBeNull();
        expect(component.getNativeElement()).toBeInstanceOf(HTMLElement);
    });

    it('should render badge text', async () => {
        const el = fixture.nativeElement.querySelector('button span:last-child');
        expect(el.textContent).toContain('badgeText');
    });

    it('should update badge text dynamically', async () => {
        fixture.componentRef.setInput('badgeText', 'MyButton2');
        fixture.detectChanges();
        await fixture.whenStable();
        const el = fixture.nativeElement.querySelector('button span:last-child');
        expect(el.textContent).toContain('MyButton2');
    });

    it('should disable button when enabled is false', async () => {
        fixture.componentRef.setInput('enabled', false);
        fixture.detectChanges();
        await fixture.whenStable();
        const button = fixture.nativeElement.querySelector('button');
        expect(button.disabled).toBe(true);
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

    it('should apply image style class', async () => {
        fixture.componentRef.setInput('imageStyleClass', 'imageStyleClass');
        fixture.detectChanges();
        await fixture.whenStable();
        const icon = fixture.nativeElement.querySelector('button span:first-child i');
        expect(icon.classList.contains('imageStyleClass')).toBe(true);
    });

    it('should set tooltip text', async () => {
        fixture.componentRef.setInput('toolTipText', 'Updated tooltip');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.toolTipText()).toBe('Updated tooltip');
    });

    it('should handle onAction event', async () => {
        const localFixture = TestBed.createComponent(ServoyBootstrapExtraBadge);
        localFixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        localFixture.componentRef.setInput('enabled', true);
        localFixture.componentRef.setInput('text', 'text');
        localFixture.componentRef.setInput('badgeText', 'badgeText');
        localFixture.componentRef.setInput('displayType', 'BUTTON');
        const onAction = vi.fn();
        localFixture.componentRef.setInput('onAction', onAction);
        localFixture.detectChanges();
        await localFixture.whenStable();
        const button = localFixture.nativeElement.querySelector('button');
        button.click();
        localFixture.detectChanges();
        await localFixture.whenStable();
        expect(onAction).toHaveBeenCalled();
    });

    it('should handle onRightClick event', async () => {
        const localFixture = TestBed.createComponent(ServoyBootstrapExtraBadge);
        localFixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        localFixture.componentRef.setInput('enabled', true);
        localFixture.componentRef.setInput('text', 'text');
        localFixture.componentRef.setInput('badgeText', 'badgeText');
        localFixture.componentRef.setInput('displayType', 'BUTTON');
        const onRightClick = vi.fn();
        localFixture.componentRef.setInput('onRightClick', onRightClick);
        localFixture.detectChanges();
        await localFixture.whenStable();
        const button = localFixture.nativeElement.querySelector('button');
        button.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true }));
        localFixture.detectChanges();
        await localFixture.whenStable();
        expect(onRightClick).toHaveBeenCalled();
    });

    it('should handle onDoubleClick event', async () => {
        const localFixture = TestBed.createComponent(ServoyBootstrapExtraBadge);
        localFixture.componentRef.setInput('servoyApi', new ServoyApiTesting());
        localFixture.componentRef.setInput('enabled', true);
        localFixture.componentRef.setInput('text', 'text');
        localFixture.componentRef.setInput('badgeText', 'badgeText');
        localFixture.componentRef.setInput('displayType', 'BUTTON');
        const onDoubleClick = vi.fn();
        localFixture.componentRef.setInput('onDoubleClick', onDoubleClick);
        localFixture.detectChanges();
        await localFixture.whenStable();
        const button = localFixture.nativeElement.querySelector('button');
        button.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
        localFixture.detectChanges();
        await localFixture.whenStable();
        expect(onDoubleClick).toHaveBeenCalled();
    });

    it('should render an <a> element when displayType is LABEL', async () => {
        fixture.componentRef.setInput('displayType', 'LABEL');
        fixture.detectChanges();
        await fixture.whenStable();
        const a = fixture.nativeElement.querySelector('a');
        const button = fixture.nativeElement.querySelector('button');
        expect(a).not.toBeNull();
        expect(button).toBeNull();
    });

    it('should render text content', async () => {
        fixture.componentRef.setInput('text', 'Hello Badge');
        fixture.detectChanges();
        await fixture.whenStable();
        const button = fixture.nativeElement.querySelector('button');
        expect(button.textContent).toContain('Hello Badge');
    });
});
