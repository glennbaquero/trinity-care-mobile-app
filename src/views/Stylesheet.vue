<template>
  <v-container wrap pb-12>
    <!-- COLOR PALETTE -->
    <h1 class="mb-5">STYLESHEET</h1>
    <v-layout wrap>
      <v-flex xs12 mb-3>
        <div>
          <h1>Color Palette</h1>
          <h2>Primary Colors</h2>
        </div>
      </v-flex>
      <v-flex xs4 text-center mb-3>
        <div class="circle cpc-1 mb-2"></div>
        <h6>Yellow</h6>
        <h5>#FABF24</h5>
      </v-flex>
      <v-flex xs4 text-center mb-3>
        <div class="circle cpc-2 mb-2"></div>
        <h6>Dark Yellow</h6>
        <h5>#DA8924</h5>
      </v-flex>
      <v-flex xs4 text-center mb-3>
        <div class="circle cpc-3 mb-2"></div>
        <h6>Dull Yellow</h6>
        <h5>#FCCA46</h5>
      </v-flex>

      <v-flex xs12 mt-5 mb-3>
        <div>
          <h1>Color Palette</h1>
          <h2>Secondary Colors</h2>
        </div>
      </v-flex>
      <v-flex xs4 text-center mb-3>
        <div class="circle csc-1 mb-2"></div>
        <h6>White</h6>
        <h5>#FFFFFF</h5>
      </v-flex>
      <v-flex xs4 text-center mb-3>
        <div class="circle csc-2 mb-2"></div>
        <h6>Darker Gray</h6>
        <h5>#5B5B5B</h5>
      </v-flex>
      <v-flex xs4 text-center mb-3>
        <div class="circle csc-3 mb-2"></div>
        <h6>Gray</h6>
        <h5>#AAAAAA</h5>
      </v-flex>
      <v-flex xs4 text-center mb-3>
        <div class="circle csc-4 mb-2"></div>
        <h6>Lighter Gray</h6>
        <h5>#989898</h5>
      </v-flex>
      <v-flex xs4 text-center mb-3>
        <div class="circle csc-5 mb-2"></div>
        <h6>Lightest Gray</h6>
        <h5>#F6F6F6</h5>
      </v-flex>
    </v-layout>

    <!-- Fonts -->
    <v-layout wrap>
      <v-flex xs12 mt-5 mb-3>
        <div>
          <h1>Typography</h1>
          <h2>Asap</h2>
        </div>
      </v-flex>
      <v-flex xs12 text-center mb-3>
        <h3 style="font-weight: bold;">Asap Bold</h3>
        <h4 style="font-weight: bold;">Aa Bb Cc Dd Ee</h4>
      </v-flex>
      <v-flex xs12 text-center mb-3>
        <h3>Asap Regular</h3>
        <h4>Aa Bb Cc Dd Ee</h4>
      </v-flex>

      <v-flex xs12 mt-5 mb-3>
        <div>
          <h1>Typography</h1>
          <h2>Header | Texts</h2>
        </div>
      </v-flex>
      <v-flex xs12>
        <h1 class="cstm-Text-Title">Heading 1 | Bold | 26px</h1>
        <h2>Heading 2 | Bold | 22px</h2>
        <h3>Heading 3 | Bold | 16px</h3>
        <h4>Heading 4 | Bold | 14px</h4>
        <h5>Heading 5 | Bold | 12px</h5>
        <h6>Heading 6 | Bold | 10px</h6>
        <p class="mb-0 cstm-Text-Default">Paragraph | Regular | 14px</p>
        <small>Small | Bold | 10px</small>
      </v-flex>
    </v-layout>

    <!-- Buttons -->
    <v-layout wrap>
      <v-flex xs12 mt-5 mb-3>
        <div>
          <h1>Buttons</h1>
        </div>
      </v-flex>
      <v-flex xs12 text-center mb-3>
        <v-btn class="button cstm-button-radius v-btn--small" depressed color="#FABF24" dark>Smaller Button</v-btn>
      </v-flex>
      <v-flex xs12 text-center mb-3>
        <v-btn class="button cstm-button-radius" depressed color="#FABF24" dark>Small Button</v-btn>
      </v-flex>
      <v-flex xs12 text-center mb-3>
        <v-btn class="button cstm-button-radius" depressed large color="#FABF24" dark>Flat Button</v-btn>
      </v-flex>
      <v-flex xs12 text-center mb-3>
        <v-btn class="button cstm-button-radius cstm-width" depressed large color="#FABF24" dark>Block Width Button</v-btn>
      </v-flex>
      <v-flex xs12 text-center mb-3>
        <v-btn class="button cstm-button-radius cstm-width type-gradient-l-r v-btn--large" depressed large dark>Block Large Width Gradient Button</v-btn>
      </v-flex>
      <v-flex xs12 text-center mb-3>
        <v-btn class="button" depressed block large color="#FABF24" dark>Block Button</v-btn>
      </v-flex>
      <v-flex xs12 text-center mb-3>
        <v-btn class="button type-3" block large dark>Account Button</v-btn>
      </v-flex>
      <v-flex xs12 text-center mb-3>
        <v-btn class="button cstm-button-radius" color="#FABF24" large dark>Button Shadow</v-btn>
      </v-flex>
      <v-flex xs12 text-center mb-3>
        <v-btn class="button type-2 cstm-button-radius" color="#FABF24" large dark>Button Type 2</v-btn>
      </v-flex>
    </v-layout>

    <!-- Forms and Input -->
    <v-layout wrap>
      <v-flex xs12 mt-5 mb-3>
        <div>
          <h1>Forms and Dropdown</h1>
        </div>
      </v-flex>
      <v-flex xs12 text-center mb-3>
        <v-text-field
          label="Regular"
          color="#A8A8A8"
          class="form__input--text"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <!-- Text, Pages, Layout Style-->
    <v-layout wrap pb-12>
      <v-flex xs12 mt-5 mb-3>
        <div>
          <h1>Text, Pages, Layout Style</h1>
        </div>
      </v-flex>
      <v-flex xs12 text-center mb-3>
        <h2>H2 Default</h2>
        <h2 class="type-1">Type 1</h2>
        <h2 class="type-2">Type 2</h2>
        <h2 class="type-3">Type 3</h2>
        <h2 class="type-lighterGray">Type Lighter Gray</h2>
        <h2 class="type-lightestGray" style="background-color:#ccc;">Type Lightest Gray</h2>
        <h2 class="type-white" style="background-color:#ccc;">Type White</h2>
      </v-flex>
      <v-flex xs12 text-center mb-3>
        <p class="mb-0">Default</p>
        <p class="type-1 mb-0">Type 1</p>
        <p class="type-2 mb-0">Type 2</p>
        <p class="type-3 mb-0">Type 3</p>
        <p class="type-lighterGray mb-0">Type Lighter Gray</p>
        <p class="type-lightestGray mb-0" style="background-color:#ccc;">Type Lightest Gray</p>
        <p class="type-white mb-0" style="background-color:#ccc;">Type White</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script type="text/javascript"></script>
<style type="text/css">
  .circle {
    width: 70px;
    height: 70px;
    margin: auto;
    border-radius: 50%;
    border: 2px solid #000;
  }

  .cpc-1 {
    background-color: #FABF24;
  }

  .cpc-2 {
    background-color: #DA8924;
  }

  .cpc-3 {
    background-color: #FCCA46;
  }

  .csc-1 {
    background-color: #FFFFFF;
  }

  .csc-2 {
    background-color: #444444;
  }

  .csc-3 {
    background-color: #A8A8A8;
  }

  .csc-4 {
    background-color: #989898;
  }

  .csc-5 {
    background-color: #F6F6F6;
  }
</style>
