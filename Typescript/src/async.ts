const delay: (ms: number) => Promise<void> = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchUser = async (userId: string): Promise<{ id: string; name: string }> => {
    await delay(1000);
    return { id: userId, name: 'John Doe' };
}

const fetchDay = async (dayId: string): Promise<{ id: string; name: string }> => {
    await delay(1000);
    return { id: dayId, name: 'Monday' };
}

const fetchMonth = async (monthId: string): Promise<{ id: string; name: string }> => {
    await delay(1000);
    return { id: monthId, name: 'January' };
}

const fetchDataWithoutParallel = async () => {
    console.time('fetchDataWithoutParallel');
    const user = await fetchUser('1');
    const day = await fetchDay('1');
    const month = await fetchMonth('1');
    console.log('User:', user);
    console.log('Day:', day);
    console.log('Month:', month);
    console.timeEnd('fetchDataWithoutParallel');
}

const fetchDataWithParallel = async () => {
    console.time('fetchDataWithParallel');
    const [user, day, month] = await Promise.all([
        fetchUser('1'),
        fetchDay('1'),
        fetchMonth('1')
    ]);
    console.log('User:', user);
    console.log('Day:', day);
    console.log('Month:', month);
    console.timeEnd('fetchDataWithParallel');
}

async function benchmarkAsyncFunctions() {
    await fetchDataWithoutParallel();
    await fetchDataWithParallel();
}

benchmarkAsyncFunctions();