<style module>
.logo_holder {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    height: var(--nav-bar-height);
    
    border-image-slice: 10 10 2 12;
    border-image-width: 0px 0px 2px 20px;
    border-image-outset: 0px 0px 0px 0px;
    border-image-repeat: round; 
    border-image-source: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIyIiB2aWV3Qm94PSIwIDAgMTIgMiI+DQogIDxsaW5lIGlkPSJMaW5lXzE5IiBkYXRhLW5hbWU9IkxpbmUgMTkiIHgxPSIxMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjdmMWU1IiBzdHJva2Utd2lkdGg9IjIiLz4NCjwvc3ZnPg0K"); 
    border-style: solid; 
}

.logo {
    display: flex;
    margin: var(--m-m);
}

.logo > img {
    max-width: 80px;
}

</style>

<template>
  <a :class='$style.logo_holder' href="/">
    <div :class='$style.logo'>
      <img src="/assets/logo.svg" />
      <p  :class='$style.logo_text + " title"'>
        concentrated
        <br />
        bursts
      </p>
    </div>
  </a>
</template>