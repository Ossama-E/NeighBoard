<template>
    <footer class="footer has-cards">
        <div class="container">
            <div class="row align-items-center justify-content-md-between">
                <div class="col-md-6">
                    <div class="copyright">
                        &copy; {{year}}
                        <a href="https://www.creative-tim.com" target="_blank" rel="noopener">Creative Tim</a> & <a href="https://www.binarcode.com" target="_blank" rel="noopener">Binar Code</a>
                    </div>
                </div>
                <div class="col-md-6">
                    <ul class="nav nav-footer justify-content-end">
                        <li class="nav-item">
                            <a href="https://github.com/Ossama-E" class="nav-link" target="_blank" rel="noopener">My Github</a>
                        </li>
                        <li class="nav-item">
                            <a href="https://www.linkedin.com/in/ossamaelhelali/" class="nav-link" target="_blank" rel="noopener">My LinkedIn</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
  name: 'app-footer',
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
};
</script>
<style>
</style>
