module.exports = function(grunt) {
    
    grunt.initConfig({
        watch: {
            cndoc: {
              files: ['./posts/*.md'],
              tasks: ['markdown:posts']
            }
        },
        markdown: {
            posts: {
                files: [
                    {
                        expand: true,
                        src: 'posts/*.md',
                        dest: './blog',
                        ext: '.html'
                    }
                ],
                options: {
                    template: 'static/nimojs-blog/layout.tpl',
                    preCompile: function(src, context) {
                        src.replace(/<\!--\_PAGEDATA([\s\S]*)?\_PAGEDATA-->/, function () {
                            var data = JSON.parse(arguments[1]);
                            for (var i in data) {
                                context[i] = data[i];
                            }
                        })
                    },
                    postCompile: function(src, context) {

                    },
                    templateContext: {},
                    markdownOptions: {
                        gfm: true,
                        highlight: 'manual'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-markdown');
    grunt.registerTask('default', ['watch','markdown:posts']);

    var fs = require('fs');
    fs.readdir('./blog/posts/', function (err, files) {
        if (err) console.log(err);
        var aReuslt = [];
        files.forEach(function (value,index,arr) {
            if (/\.html$/.test(value)) {
                aReuslt.push('blog/posts/' + value);
            }
        })
        fs.writeFileSync('./blog/posts/data.js', 'showlist('+JSON.stringify(aReuslt)+')');
    })
    
};