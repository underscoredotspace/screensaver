module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      view: {
        files: ['public/**/*'],
        options: {
          livereload: true
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.registerTask('default', ['watch'])
}