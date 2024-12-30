import { ServoyApiTesting, ServoyPublicTestingModule } from '@servoy/public';
import { MountConfig } from 'cypress/angular';
import { ServoyBootstrapExtraBadge } from './badge';

describe('Badge Component', () => {
  const servoyApiSpy = new ServoyApiTesting();

  const config: MountConfig<|ServoyBootstrapExtraBadge> = {
      imports: [ ServoyPublicTestingModule],
  } 

  beforeEach(() => {
      config.componentProperties = {
          servoyApi: servoyApiSpy,
          displayType: 'BUTTON',
          badgeText: 'badgeText'
      }
  });

  it('can mount', () => {
    const registerComponent = cy.stub(servoyApiSpy, 'registerComponent');
    cy.mount(ServoyBootstrapExtraBadge, config);
    cy.get('button span').should('have.text', ' badgeText ').then(_ => {
        expect(registerComponent).to.been.called;
    });
  });
})