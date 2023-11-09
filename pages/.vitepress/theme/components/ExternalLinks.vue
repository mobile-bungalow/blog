<style module>
.external_links {
  align-self: end;
  margin-right: auto;
  margin-left: auto;

  border-image-slice: 27 10 10 12;
  border-image-width: 24px 8px 8px 0px;
  border-image-outset: 0px 34px 0px 0px;
  border-image-repeat: stretch stretch;
  border-image-source: url("data:image/svg+xml;base64,DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEyIiBoZWlnaHQ9IjE3MiIgdmlld0JveD0iMCAwIDEyIDE3MiI+DQogIDxwYXRoIGlkPSJQYXRoXzgiIGRhdGEtbmFtZT0iUGF0aCA4IiBkPSJNMC0yLjE3NVYxMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNyAxNjIpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmN2YxZTUiIHN0cm9rZS13aWR0aD0iMiIvPg0KICA8bGluZSBpZD0iTGluZV83IiBkYXRhLW5hbWU9IkxpbmUgNyIgeTI9IjE0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjdmMWU1IiBzdHJva2Utd2lkdGg9IjIiLz4NCiAgPGxpbmUgaWQ9IkxpbmVfOCIgZGF0YS1uYW1lPSJMaW5lIDgiIHgxPSIxMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxNjcpIiBmaWxsPSJub25lIiBzdHJva2U9IiNmN2YxZTUiIHN0cm9rZS13aWR0aD0iMiIvPg0KPC9zdmc+DQo=");
  border-style: solid;
}

.svg_link {
  display: flex;
  align-items: center;
  margin-top: var(--m-m);
  margin-bottom: var(--m-m);
}

.svg_link>a {
  padding-bottom: auto;
  padding-top: auto;
  color: var(--fill-color);
}

.svg_link>img {
  width: var(--m-xl);
  margin-right: var(--m-m);
}
</style>

<template>
  <div :class="$style.external_links">
    <div :class="$style.svg_link + ' body'">
      <img src="/assets/email.svg" />
      <a href="mailto:perfidious@ddress.ihop"> pwmay.work{a}gmail.com </a>
    </div>
    <div :class="$style.svg_link + ' body'">
      <img src="/assets/git.svg" />
      <a href="https://www.github.com/mobile-bungalow"> Git Portfolio </a>
    </div>
    <div :class="$style.svg_link + ' body'">
      <img src="/assets/linkedin.svg" />
      <a href="https://www.linkedin.com/in/mobile-bungalow"> Linkedin </a>
    </div>
  </div>
</template>