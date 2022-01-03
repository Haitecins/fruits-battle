import { uid } from "../data/index.js";

// Add logo at the bottom of the page.
$("head").append(`
    <style data-type="jquery-build">
        #jquery {
            background: rgba(255, 255, 255, 0.5);
            color: #1b1b1b;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            padding: 4px 10px;
            position: fixed;
            right: 4px;
            bottom: 4px;
        }
        #jquery a {
            color: #0769ad;
        }
    </style>
`);
$("#wrapper").after(`
    <div id="jquery" data-type="jquery-build">
        <p>${uid}</p>
        <p>Copyright 2021, Powered by
            <a href="https://jquery.com" target="_blank" title="jquery.com">jQuery</a>
            <a href="https://api.jquery.com/" target="_blank" title="api.jquery.com">API</a>.
        </p>
    </div>
`);
