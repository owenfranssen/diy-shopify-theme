# Styling Conventions

## Mobile-first

Mobile First is a design strategy that makes development for mobile devices the priority. It means all styles outside of media queries apply to all devices. Changes for larger screens are targeted with media queries. This prevents small devices from having to parse tons of unused CSS.

## Class Naming

Loosly follow a cross between the BEM and SMACSS naming conventions but without the ban on nesting. [Find the BEM naming overview here.](http://getbem.com/naming/)

Assuming a button component for the samples below:

### Component

`.component`

E.g. `.btn`

### Component element

`.component__element`

E.g. `.btn__price`

### Component Modifier

`.component--modifier`

E.g. `.btn--red` and `.btn__price--red`

### Component State

`.component--is-state`

E.g. `.btn--is-active`

### Generic State

State does not have to be specific to a component.

E.g. `.is-visible` and `.is-hidden`

### Script Identifiers

Identifiers, classes or IDs, for use in Javascript should be completely separate from style identifiers.

Class names to create a relationship between DOM elements and Javascript code should be prefixed by `js-` and follow the format: `js-(component-name)`.

## Liquid

Shopify is deprecating serverside Sass compiling. Themes will have to include straight SCSS instead. Liquid is allowed in CSS. However, when working offline with Sass and compiling this to a single CSS file for upload to Shopify, stylelint and the Sass compiler will both throw errors on liquid code.

Liquid needs to be escaped. This is done by using string interpolation in Sass. Wrap liquid variables in `#{' ... '}` Example:

    a{
      colour: #{'{{ settings.link-colour }}'};
    }

## CSS Custom Properties

Where possible Liquid and Sass variables will be avoided in Sass and CSS code. Instead, CSS custom properties will be used.

CSS custom properties may also be defined in Section includes to pass on settings from the Shopify RTE.

CSS custom properties are defined and used as follows:

    <style>
      :root {
        --custom-property: value;
      }

      a {
        color: var(--custom-property);
      }
    </style>
