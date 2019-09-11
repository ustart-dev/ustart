/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="uStart" />
      </div>
    );

    const ProjectTitle = props => (
      <h1 className="projectTitle">
        {/*siteConfig.title*/}
        <img src={props.img_src} alt="uStart" />
        {siteConfig.tagline}
      </h1>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        {/*<Logo img_src={`${baseUrl}img/icono-ustart.svg`} />*/}
        <div className="innerHome">
          <ProjectTitle
            siteConfig={siteConfig}
            img_src={`${baseUrl}img/icono-ustart.svg`}
          />
          <PromoSection>
            <Button href={docUrl('installation.html')}>Getting Started</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = props => (
      <Container
        padding={props.padding || ['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2 style={{ color: 'red' }}>NOTE</h2>
        <MarkdownBlock>
          The content of this documentation is being actively modified to reach the version 1.0.
          We will add docs versioning when its ready.

          Many sections and examples are missing and they will be created as we go,
          so take a look at this page constantly to see docs improvements.
        </MarkdownBlock>
      </div>
    );

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content: 'Get up and running quickly without wasting time!',
            image: `${baseUrl}img/try-it-out/init-cmd.png`,
            imageAlign: 'left',
            title: 'Try it Out',
          },
        ]}
      </Block>
    );

    const Description = () => (
      <Block background="dark">
        {[
          {
            content:
              'This is another description of how this project is useful',
            image: `${baseUrl}img/docusaurus.svg`,
            imageAlign: 'right',
            title: 'Description',
          },
        ]}
      </Block>
    );

    const LearnHow = () => (
      <Block background="light" id="learnHow">
        {[
          {
            content: 'Follow a [basic example](docs/first-example-1) and learn how it works',
            image: `${baseUrl}img/learn-how/book_lover.svg`,
            imageAlign: 'right',
            title: 'Learn How',
          },
        ]}
      </Block>
    );

    const Features = () => (
      <Block layout="threeColumn">
        {[
          {
            content: 'Tired of reading tons of tutorials about how to structure a complex NodeJS backend. Start right away and focus on the business logic.',
            image: `${baseUrl}img/features/ready-2.svg`,
            imageAlign: 'top',
            title: 'Ready to use',
          },
          {
            content: 'Amazing technologies are embedded, so you just have to use them: Sequelize, Mongoose, Graphql shield and more.',
            image: `${baseUrl}img/features/integration-2.svg`,
            imageAlign: 'top',
            title: 'Tightly integration',
          },
          {
            content: 'Don\'t stay behind. Move to the next big thing and forget about all those old REST APIs. GraphQL is here to stay.',
            image: `${baseUrl}img/features/GraphQL_Logo.svg`,
            imageAlign: 'top',
            title: 'GraphQL',
          },
        ]}
      </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : '') + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <p>This project is used by all these people</p>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl('users.html')}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          {/*<FeatureCallout />*/}
          <LearnHow />
          <TryOut />
          {/*<Description />*/}
          {/*<Showcase />*/}
        </div>
      </div>
    );
  }
}

module.exports = Index;
