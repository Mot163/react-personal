import React, { useState } from 'react';
import {
    Box,
    MenuItem,
    Select,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Tabs,
    TextField
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Send as SendIcon } from '@mui/icons-material';
import CodeEditer, { LanguageEnum } from '../componets/base/CodeEditer';
import RequestHeader, { HeaderRowConstruct } from '../componets/test/RequestHeader';
import RequestQuery, { QueryRowConstruct } from '../componets/test/RequestQuery';

/** 默认请求Headers */
const defaultRequestHeaders = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.76',
    'Connection': 'keep-alive'
};

/**
 * 判断是否为URL
 *
 * @param str url字符串
 */
function isUrl(str: string): boolean {
    const regExpStr = '^((https|http)://)(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    return new RegExp(regExpStr, 'i').test(str);
}

/**
 * 获取文本类型
 *
 * @param text 文本
 * @returns 文本类型
 */
function getTextType(text: string): LanguageEnum {
    return text.trim().startsWith('<') ? LanguageEnum.HTML : LanguageEnum.JSON;
}

/**
 * 文本格式化
 *
 * @param text 文本
 * @returns 格式化文本
 */
function textFormat(text: string): string {
    switch (getTextType(text)) {
        case LanguageEnum.JSON:
            text = JSON.stringify(JSON.parse(text), null, '\t');
            break;
        case LanguageEnum.HTML:
            let formatted = '';
            let indent = '';
            const tab = '    ';
            text.split(/>\s*</).forEach((node) => {
                if (node.match(/^\/\w/)) {
                    indent = indent.substring(tab.length);
                }
                formatted += indent + '<' + node + '>\r\n';
                if (node.match(/^<?\w[^>]*[^\/]$/)) {
                    indent += tab;
                }
            });
            text = formatted.substring(1, formatted.length - 3);
            break;
    }
    return text;
}

/**
 * 标签页
 */
function TabItem({ tabsValue, index, children }: { tabsValue: number; index: number; children?: React.ReactNode }) {
    return (
        <Box hidden={tabsValue !== index} sx={{ flex: 1, padding: '5px', height: 0 }}>
            {children}
        </Box>
    );
}

/**
 * 接口测试
 */
function Test() {
    // 请求选项卡索引值
    const [requestTabsValue, setRequestTabsValue] = useState(1);
    // 响应选项卡索引值
    const [rsponseTabsValue, setResponseTabsValue] = useState(0);
    // 请求方法
    let [method, setMethod] = useState('GET');
    // 接口地址
    let [url, setUrl] = useState('');
    // 请求Header
    let requestHeaders: Array<{ name: string; value: string }>;
    // 请求Body
    let [requestBody, setRequestBody] = useState('');
    // 响应数据
    let [responseData, setResponseData] = useState('');
    // 发送Headers
    let [sendHeaders, setSendHeaders] = useState(new Array<{ name: string; value: string }>());
    // 响应Headers
    let [responseHeaders, setResponseHeaders] = useState(new Array<{ name: string; value: string }>());
    // 是否在发送中
    let [loading, setLoading] = useState(false);

    // 获取请求Header参数
    const getRequestHeaders = (rows: Array<HeaderRowConstruct>) => {
        requestHeaders = new Array<{ name: string; value: string }>();
        for (const row of rows) {
            if (row.isUse && row.name.trim() !== '') {
                requestHeaders.push({ name: row.name, value: row.value });
            }
        }
    };

    // 获取请求Query参数
    const getRequestRequestQueries = (rows: Array<QueryRowConstruct>) => {
        const index = url.indexOf('?');
        let newUrl = (index > -1 ? url.substring(0, index) : url) + '?';
        for (let i = 0; i < rows.length; ++i) {
            if (rows[i].isUse && rows[i].name !== '') {
                newUrl += `${newUrl[newUrl.length - 1] === '?' ? '' : '&'}${rows[i].name}=${rows[i].value}`;
            }
        }
        if (newUrl[newUrl.length - 1] === '?') {
            newUrl = newUrl.substring(0, newUrl.length - 1);
        }
        newUrl !== url && setUrl(newUrl);
    };

    // 发送请求
    const send = () => {
        if (!isUrl(url)) {
            return;
        }
        setLoading(true);
        setResponseData('');
        setResponseHeaders([]);
        const headers: { [key: string]: string } = {};
        const headerArray = Object.entries(defaultRequestHeaders).map((header) => ({
            name: header[0],
            value: header[1]
        }));
        if (method === 'POST' && requestBody !== '') {
            headerArray.push({ name: 'Content-Type', value: 'application/json' });
        }
        requestHeaders && headerArray.push(...requestHeaders);
        headerArray.forEach((header) => (headers[header.name] = header.value));
        setSendHeaders(Object.entries(headers).map((header) => ({ name: header[0], value: header[1] })));
        const options: { [key: string]: any } = { method, headers };
        requestBody !== '' && (options.body = requestBody);
        fetch(url, options)
            .then((res) => {
                setLoading(false);
                const newResponseHeaders = new Array<{ name: string; value: string }>();
                res.headers.forEach((value, name) => newResponseHeaders.push({ name, value }));
                setResponseHeaders(newResponseHeaders);
                return res.text();
            })
            .then((text) => setResponseData(text))
            .catch((e) => {
                setLoading(false);
                window.alert(e.message);
            });
    };

    return (
        <Box sx={{ backgroundColor: 'white' }}>
            <Stack spacing={0.25} sx={{ height: '100vh', padding: '10px' }}>
                {/* 接口地址栏 */}
                <Stack direction="row" spacing={0.25}>
                    <Select
                        value={method}
                        size="small"
                        sx={{ width: '110px' }}
                        onChange={(e) => setMethod(e.target.value)}
                    >
                        <MenuItem value="GET">GET</MenuItem>
                        <MenuItem value="POST">POST</MenuItem>
                    </Select>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="接口地址"
                        sx={{ flex: 1 }}
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        error={url !== '' && !isUrl(url)}
                        onKeyDown={(e) => e.key === 'Enter' && send()}
                    />
                    <LoadingButton
                        variant="contained"
                        size="small"
                        sx={{ width: '100px', height: '38px' }}
                        endIcon={<SendIcon />}
                        loading={loading}
                        loadingPosition="end"
                        onClick={send}
                    >
                        <span>发送</span>
                    </LoadingButton>
                </Stack>

                {/* 接口请求栏 */}
                <Stack sx={{ height: '40vh' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={requestTabsValue} onChange={(e, value) => setRequestTabsValue(value)}>
                            <Tab label="Header" />
                            <Tab label="Query" />
                            <Tab label="Body" />
                        </Tabs>
                    </Box>
                    {/* 请求Header参数 */}
                    <TabItem tabsValue={requestTabsValue} index={0}>
                        <RequestHeader onChange={getRequestHeaders} />
                    </TabItem>
                    {/* 请求Query参数 */}
                    <TabItem tabsValue={requestTabsValue} index={1}>
                        <RequestQuery url={url} onChange={getRequestRequestQueries} />
                    </TabItem>
                    {/* 请求Body参数 */}
                    <TabItem tabsValue={requestTabsValue} index={2}>
                        <CodeEditer
                            defaultLanguage={LanguageEnum.JSON}
                            value={requestBody}
                            onChange={(newValue) => setRequestBody(newValue)}
                        />
                    </TabItem>
                </Stack>

                {/* 接口响应栏 */}
                <Stack sx={{ flex: 1, height: 0 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={rsponseTabsValue} onChange={(e, value) => setResponseTabsValue(value)}>
                            <Tab label="实时响应" />
                            <Tab label="请求头" />
                            <Tab label="响应头" />
                        </Tabs>
                    </Box>
                    {/* 响应内容 */}
                    <TabItem tabsValue={rsponseTabsValue} index={0}>
                        {responseData ? (
                            <CodeEditer
                                defaultLanguage={getTextType(responseData)}
                                value={textFormat(responseData)}
                                readOnly={true}
                            />
                        ) : null}
                    </TabItem>
                    {/* 请求头 */}
                    <TabItem tabsValue={rsponseTabsValue} index={1}>
                        <TableContainer component={Box} sx={{ maxHeight: '100%' }}>
                            <Table stickyHeader size="small">
                                <TableBody>
                                    {sendHeaders.map((row, index) => (
                                        <TableRow hover key={index}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabItem>
                    {/* 响应头 */}
                    <TabItem tabsValue={rsponseTabsValue} index={2}>
                        <TableContainer component={Box} sx={{ maxHeight: '100%' }}>
                            <Table stickyHeader size="small">
                                <TableBody>
                                    {responseHeaders.map((row, index) => (
                                        <TableRow hover key={index}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabItem>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Test;
